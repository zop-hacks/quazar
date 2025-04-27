import { createClient } from "@/utils/supabase/server";
import { signOut } from "@/app/login/actions";
import { Navbar } from "./navbar";
const CollapsibleNavbar = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    
    <Navbar
    user={user}
    signOut={async () => {
      "use server"
      await signOut()
    }}
  />
  );
};

export default CollapsibleNavbar;
