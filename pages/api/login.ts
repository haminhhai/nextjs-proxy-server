// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import httpProxy, { ProxyResCallback } from "http-proxy";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

const proxy = httpProxy.createProxyServer({});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(404).json({ message: "Method not supported" });
  }

  return new Promise((resolve) => {
    // don't send cookies to API server
    req.headers.cookie = "";

    const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
      let body = "";

      proxyRes.on("data", (chunk) => {
        body += chunk;
        console.log("🚀 ~ body", body);
      });
      proxyRes.on("end", () => {
        try {
          const { accessToken, expiredAt } = JSON.parse(body);
          console.log({ accessToken, expiredAt });

          (res as NextApiResponse)
            .status(200)
            .json({ message: "Login success" });
        } catch (error) {
          (res as NextApiResponse)
            .status(500)
            .json({ message: "Something went wrong" });
        }

        // res.end("Success");
        resolve(true);
      });
    };

    proxy.once("proxyRes", handleLoginResponse);
    proxy.web(req, res, {
      target: process.env.API_URL,
      changeOrigin: true,
      selfHandleResponse: true,
    });
  });
  //   res.status(200).json({ name: 'John Doe' })
}
