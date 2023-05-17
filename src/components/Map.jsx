import React from 'react'

function Map({ data, handleCityClick}) {
  return (
    <div>
        <div className='flex justify-center items-start h-[90vh]'>
            <svg
                className="w-full h-full m-auto"
                viewBox="0 0 1000 1000"
                xmlns="http://www.w3.org/2000/svg"
                dangerouslySetInnerHTML={{ __html: data }}
                onClick={handleCityClick} 
              />
        </div>
    </div>
  )
}

export default Map