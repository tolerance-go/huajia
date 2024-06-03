import fastifyStatic from "@fastify/static";
import Fastify, { FastifyInstance } from "fastify";
import path from "path";
import qs from "qs";
import { fileURLToPath } from "url";
import root from "./src/root";
import { components } from "./src/components";

const fastify: FastifyInstance = Fastify({ logger: true });
// 获取当前模块的目录名
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface RenderRequest {
  component: string;
  props: { [key: string]: any };
}

fastify.register(fastifyStatic, {
  root: path.join(__dirname, "public"),
  prefix: "/public/", // optional: default '/'
});

fastify.get<{ Querystring: { query: string } }>(
  "/render",
  async (request, reply) => {
    const parsedQuery = qs.parse(request.query);

    // 打印解析后的 query 参数
    request.log.info(`Received query: ${JSON.stringify(parsedQuery)}`);

    const { component, props } = parsedQuery as unknown as RenderRequest;

    if (!components[component]) {
      return reply.status(400).send({ error: "Invalid component" });
    }

    return reply.type("text/html").send(
      root({
        component,
        props,
      })
    );
  }
);

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
    fastify.log.info(`Server is running at http://localhost:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
