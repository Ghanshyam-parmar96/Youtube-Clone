import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../data/hooks"
import { toggleSwitch } from "../data/sidebarSlice";

const ToggleSwitch = () => {
    const dispatch = useAppDispatch();
    const isChecked = useAppSelector((state) => state.sidebar.isChecked);

    useEffect(() => {
        const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (prefersDarkMode) {
            dispatch(toggleSwitch(true));
            document.body.classList.add('dark');
        }else{
            dispatch(toggleSwitch(false));
            document.body.classList.remove('dark');
        }          
    }, [])

    const handleCheckboxChange = () => {
        if (!isChecked) {
            dispatch(toggleSwitch(true));
            document.body.classList.add('dark');
        }else{
            dispatch(toggleSwitch(false));
            document.body.classList.remove('dark');
        }      
    }

    return (
        <>
            <div className="flex gap-6 px-3 my-3">
                <span className="text-sm font-bold">{isChecked ? "Dark" : "Light"} mode</span>
                <div className="inline-flex items-center">
                    <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
                        <input id="switch-1" type="checkbox" checked={isChecked} onChange={handleCheckboxChange}
                            className="absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-blue-gray-100 checked:bg-blue-500 peer-checked:border-blue-500 peer-checked:before:bg-blue-500 bg-black" />
                        <label htmlFor="switch-1"
                            className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-black bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-blue-500 peer-checked:before:bg-blue-500 before:bg-black">
                            <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                                data-ripple-dark="false"></div>
                        </label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ToggleSwitch;
