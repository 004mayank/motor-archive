declare namespace Cloudflare {
  interface Env {
    DB?: D1Database;
    BUCKET?: R2Bucket;
    CONTENT_MODE?: "sample" | "live";
    ADMIN_EMAILS?: string;
    TAVILY_API_KEY?: string;
    LLM_API_KEY?: string;
    LLM_BASE_URL?: string;
    LLM_MODEL?: string;
    RESEND_API_KEY?: string;
    EMAIL_FROM?: string;
    CRON_SECRET?: string;
    APP_ORIGIN?: string;
  }
}
