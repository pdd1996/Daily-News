import { fetchAllNews, formatNewsSummary } from "@/lib/rss_utils";
import { inngest } from "./client";
import { Resend } from "resend";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    // 休眠一秒
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);

export const sendDailyNews = inngest.createFunction(
  { id: "send-daily-news" },
  { event: "test/send.daily.news" },
  async ({ event, step }) => {
    // todo

    // 1. 从多个RSS源头获取新闻
    const newsItems = await step.run("fetch-news", async () => {
      console.log("Fetching news...");
      const news = await fetchAllNews();
      console.log("News Fetch", news.length);
      return news;
    });

    // 2. 整理为每日摘要
    const newsSummary = await step.run("format-news", async () => {
      console.log("Formatting news...");
      const summary = formatNewsSummary(newsItems);
      console.log("News Summary", summary);
      return summary;
    });

    // 3. 创建邮件内容
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { data, error } = await step.run("create-email", async () => {
      console.log("Sending email...");

      const result = await resend.broadcasts.create({
        from: "Dailt Briefs <onboarding@resend.dev>",
        segmentId: "157a5a0d-546d-4a42-961b-76fe401bfb16",
        subject: `Daily Briefs - ${new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}`,
        html: newsSummary.html,
      });

      return result;
    });
    
    // 4. 发送邮件
    const { error: sendError } = await step.run("send-email", async () => {
      console.log("Sending email error..s.");
      const result = await resend.broadcasts.send(data?.id!);
      return result;
    });

    if(sendError) {
      console.log("Email error:", sendError);
      return { message: sendError.message }
    }

    return { message: "Email sent successfully" };
  },
);
