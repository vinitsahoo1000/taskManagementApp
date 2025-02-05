export const SideMenu = () => {
    return (
        <div>
            <aside
            id="logo-sidebar"
            className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full bg-white border-r border-b rounded-b-lg border-gray-200 sm:translate-x-0 flex flex-col justify-between"
            aria-label="Sidebar">
            <div className="flex p-5 bg-white border-b rounded-md border-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7 pr-1">
            <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
            <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
            </svg>
                <h1 className="text-xl font-semibold text-gray-900">Task Note</h1>
            </div>
            <div className="h-full pt-2 px-3 pb-4 overflow-y-auto bg-white flex flex-col">
            <ul className="space-y-2 font-medium flex-1">
                <li>
                <a
                href="/"
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100"
                >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                </svg>
                <span className="ms-3">Home</span>
                </a>
            </li>
            </ul>
            <div className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 mt-auto">
                <img
                src="https://res.cloudinary.com/dbbrijt9o/image/upload/v1731909988/default-profile1_y79mi3.jpg"
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
                />
            <span className="ms-3">Vinit Sahoo</span>
            </div>
        </div>
        </aside>
    </div>
    );
};
