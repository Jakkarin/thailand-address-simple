import {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from "react";

import ThailandAddressSimple from 'thailand-address-simple';

const context = createContext<ThailandAddressSimple | null>(null);

const AddressProvider = function (props: PropsWithChildren) {
    const [address, setAddress] = useState<ThailandAddressSimple | null>(null);

    useEffect(() => {
        const address = new ThailandAddressSimple();
        address.init().then(() => setAddress(() => address));
    }, []);

    if (!address) {
        return null;
    }

    return <context.Provider value={address}>{props.children}</context.Provider>;
};

export const useAddress = function () {
    return useContext(context) as ThailandAddressSimple;
};

export default AddressProvider;