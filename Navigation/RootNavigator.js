import {createNativeStackNavigator} from "@react-navigation/native-stack";
import MainTab from "./MainTab.js";
import PatientProfile from "../src/pages/PatientProfiles.jsx"
import DonorProfile from "../src/pages/DonorProfiles.jsx";
import Landing from "../src/pages/Landing.jsx";
import PatientForm from "../src/pages/PatientForm.jsx";
import DonorForm from "../src/pages/DonorForm.jsx";

const Stack = createNativeStackNavigator();
const RootNavigator = () => {
    return(
        <Stack.Navigator screenOptions={{ headerShown : false}}>
            <Stack.Screen name = "Landing" component = {Landing}/>
            <Stack.Screen name = "MainTabs" component = {MainTab}/>
            <Stack.Screen name = "PatientProfile" component = {PatientProfile}/>
            <Stack.Screen name = "DonorProfile" component = {DonorProfile}/>
            <Stack.Screen name = "DonorForm" component = {DonorForm}/>
            <Stack.Screen name = "PatientForm" component = {PatientForm}/>
        </Stack.Navigator>
    )
}
export default RootNavigator;