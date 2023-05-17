import React, { useState,useEffect } from 'react'

function Table({ tableData }) {

  return (
    <div className='p-10 col-span-1 flex justify-center items-center h-full'>
      <div className="container mx-auto p-2">
      <h2 className='text-center text-2xl font-bold mb-2'>
            {tableData.title}
        </h2>
      <div className="">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-1 py-2"></th>
              <th className="px-1 py-2 bg-blue-50 border  text-center" colSpan={2}>İlk Tur</th>
              <th className="px-1 py-2 bg-blue-50 border text-center" colSpan={2}>İkinci Tur</th>
            </tr>
          </thead>
          <tbody>
          <tr>
              <td className="border font-bold px-1 py-2">KK</td>
              <td className="border px-1 py-2">
              {tableData.ilk_tur.kk}
              </td>
              <td className="border px-1 py-2">
              %{tableData.ilk_tur.kk_percent}
              </td>
              <td className="border px-1 py-2">
              {tableData.ikinci_tur.rte}
              </td>
              <td className="border px-1 py-2">
              %{tableData.ikinci_tur.rte_percent}
              </td>
            </tr>
            <tr>
              <td className="border font-bold px-1 py-2">RTE</td>
              <td className="border px-1 py-2">
                {tableData.ilk_tur.rte}
              </td>
              <td className="border px-1 py-2">
                %{tableData.ilk_tur.rte_percent}
              </td>
              <td className="border px-1 py-2">
              {tableData.ikinci_tur.rte}
              </td>
              <td className="border px-1 py-2">
              %{tableData.ikinci_tur.rte_percent}
              </td>
            </tr>
            
            <tr>
                <td className="border font-bold px-1 py-2">FARK</td>
                <td className="border px-1 py-2" colSpan={2}>
                {tableData.ilk_tur.diff}
                </td>
                <td className="border px-1 py-2" colSpan={2}>
                {tableData.ikinci_tur.diff}
                </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
  )
}

export default Table