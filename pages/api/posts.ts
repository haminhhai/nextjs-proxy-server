// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import httpProxy, { ProxyReqCallback } from "http-proxy";
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
  if (req.method !== "GET") {
    return res.status(404).json({ message: "Method not supported" });
  }

  return new Promise((resolve) => {
    // don't send cookies to API server
    req.headers.cookie = "";

    // const handleLoginResponse: ProxyReqCallback = (proxyReq, req, res) => {
    //   let body = "";

    //   proxyReq.on("data", (chunk) => {
    //     console.log("🚀 ~ chunk", chunk)
    //     // body += chunk;
    //   });
    //   proxyReq.on("end", () => {
    //     // const { accessToken, expiredAt } = JSON.parse(body);

    //     // console.log({ accessToken, expiredAt });

    //     res.end("Success");
    //   });
    // };

    // proxy.once("proxyReq", handleLoginResponse);

    proxy.web(req, res, {
      target: process.env.API_URL,
      changeOrigin: true,
      selfHandleResponse: false,
      pathRewrite: {
        '^/api/old-path': '/api/new-path', // rewrite path
        '^/api/remove/path': '/path', // remove base path
      },
    });
  });
  //   res.status(200).json({ name: 'John Doe' })
}
