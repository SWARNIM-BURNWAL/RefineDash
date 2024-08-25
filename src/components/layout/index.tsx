import { ThemedLayoutV2, ThemedTitleV2 } from "@refinedev/antd";
import Header  from "./header";

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <ThemedLayoutV2
      Header={Header}
      
      Title={(tittleprops) => <ThemedTitleV2 {...tittleprops} text="Admin Panel"  />
    }
    >
      {children}
    </ThemedLayoutV2>
  );
};

export default Layout;