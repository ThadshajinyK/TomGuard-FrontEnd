import General from "./tabs/General";
import Report from "./tabs/Report";
import Preferences from "./tabs/Preferences";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "../../Styles/SettingPageStyles.css";

const Settings = () => {
  return (
    <div style={{ margin: "130px 20px 30px 220px" }}>
      <Tabs>
        <TabList>
          <Tab>General</Tab>
          <Tab>Preference</Tab>
          <Tab>Report</Tab>
        </TabList>

        <TabPanel>
          <General />
        </TabPanel>
        <TabPanel>
          <Preferences />
        </TabPanel>
        <TabPanel>
          <Report />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Settings;
