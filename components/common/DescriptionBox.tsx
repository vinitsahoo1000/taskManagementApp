

export const DescriptionBox = () =>{
    

    return(
        <div>
        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">description</label>
        <textarea id="description" rows={2} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none" placeholder="Write your description here here..."></textarea>
        </div>
    )
}