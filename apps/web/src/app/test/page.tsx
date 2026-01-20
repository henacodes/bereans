import { api } from "@bereans/api/server";

export default async function TestPage() {
  const healthCheck = await api.healthCheck();
  return (
    <p>
      test page
      {healthCheck}
    </p>
  );
}
