import { ChangeEvent, useState } from 'react';
import { useAddress } from './providers/AddressProvider';
import type { Address } from 'thailand-address-simple';

function App() {
    const address = useAddress();

    const [state, setState] = useState({
        search: '',
        select: '',
        result: [] as (Address & { key: string; })[],
    });

    const handleSelect = function (value: any) {
        setState({ ...state, select: value });
    };

    const handleInputChange = function (e: ChangeEvent<HTMLInputElement>) {
        const value = e?.target?.value ?? '';
        if (!value.trim()) {
            setState({ ...state, result: [], search: '' });
        } else {
            setState({ ...state, result: address.search(value).slice(0, 16).map(r => ({ ...r, key: r.amphoe + r.district + r.province + r.zipcode })), search: value });
        }
    };

    return (
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Thailand Address Simple
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Github: <a href="https://github.com/Jakkarin/thailand-address-simple">https://github.com/Jakkarin/thailand-address-simple</a>
                        <br />
                        Github (ต้นฉบับ): <a href="https://github.com/earthchie/jquery.Thailand.js">https://github.com/earthchie/jquery.Thailand.js</a>
                    </p>
                </div>

                <input
                    type="text"
                    className="block w-full flex-1 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    placeholder="ปทุมธานี"
                    onChange={handleInputChange}
                />

                <form>
                    <div className="mt-4 space-y-4">

                        {state.result.map((row) => (
                            <div key={row.key} className="flex items-center">
                                <input
                                    id={row.key}
                                    name="address"
                                    type="radio"
                                    onChange={() => handleSelect(row)}
                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />

                                <label htmlFor={row.key} className="ml-3 block text-sm font-medium text-gray-700">
                                    {row.district} ›› {row.amphoe} ›› {row.province} ›› {row.zipcode}
                                </label>
                            </div>
                        ))}

                    </div>
                </form>

            </div>
        </div>
    );
}

export default App;
