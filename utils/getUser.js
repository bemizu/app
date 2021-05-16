import { createClient } from "@supabase/supabase-js";

  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_PUBLIC_ANON
  );

export async function GetUser(
  user, session
) {
  const { data, error } = await supabase
    .from("business_users")
    .select(
      `
              id,
              email, 
              onboarded, 
              comet,
              fullName
            `
    )
    .eq("email", user.email);

  if (!error && data.length) {
    session.setUser(data[0]);

    const orgReq = await supabase
      .from("organizations")
      .select(
        ` 
        id,      
        name,
        username, 
        website,
        overview,
        culture,
        logo,
        businessSize, 
        industry,
        views, 
        locations (
          id,
          title,
          oid,
          locObj,
          latLng
        ),
        jobs (
          id, 
          title, 
          oid,
          lid,
          description, 
          salaryMin, 
          salaryMax, 
          salaryType
        ),
        team_members (
          id, 
          title, 
          name, 
          email, 
          image, 
          phone
        )
              
            `
      )
      .eq("uuid", data[0].id);

    if (!orgReq.error && orgReq.data.length) {
      session.setOrganization(orgReq.data[0]);
    } else {
      console.log(orgReq.error);
    }
  } else {
    console.log(error);
    // router.push("/");
  }
}
