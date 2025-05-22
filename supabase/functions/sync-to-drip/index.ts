import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const ACCOUNT = Deno.env.get("DRIP_ACCOUNT_ID")
const TOKEN   = Deno.env.get("DRIP_API_TOKEN")

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  const { email, name, sourceApp } = await req.json()

  await fetch(
    `https://api.getdrip.com/v2/${ACCOUNT}/subscribers`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token token=${TOKEN}`
      },
      body: JSON.stringify({
        subscribers: [{
          email,
          first_name: name,
          tags: [sourceApp]
        }]
      })
    }
  )

  return new Response("ok", { headers: corsHeaders })
})
