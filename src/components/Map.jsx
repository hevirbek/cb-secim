import React from 'react'

function Map({ data, handleCityClick}) {
  return (
    <div>
        <div className='flex justify-center items-start h-[90vh]'>
            <svg
                className="w-full h-full md:m-10 m-auto"
                viewBox="0 60 900 300"
                xmlns="http://www.w3.org/2000/svg"
                dangerouslySetInnerHTML={{ __html: data }}
                onClick={handleCityClick} 
              />
        </div>
    </div>
  )
}

export default Map