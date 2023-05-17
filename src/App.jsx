import React, { useEffect } from 'react';
import Map from './components/Map';
import Table from './components/Table';

function App() {
  const [tab, setTab] = React.useState(0);
  const [ilktur, setIlktur] = React.useState([]);
  const [ikincitur, setIkincitur] = React.useState([]);
  const [tableData, setTableData] = React.useState(
    {
      title: 'Adana',
      ilk_tur: {
        rte: 0,
        rte_percent: 0,
        kk: 0,
        kk_percent: 0,
        diff: 0,
      },
      ikinci_tur: {
        rte: 0,
        rte_percent: 0,
        kk: 0,
        kk_percent: 0,
        diff: 0,
      }
    }
  ); 
  const [data, setData] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const handleCityClick = (event) => {
    const clickedCity = event.target;
    const plakakodu = clickedCity.parentNode.getAttribute('data-plakakodu');
    const cities = ilktur.CB.YurtIci.b;
    const ilktur_data = cities.find((il) => il.k === parseInt(plakakodu));
    if (ilktur_data === undefined) {
      const general = ilktur.CB.YurtIci.c;
      const k41 = general.find((k) => k.k === 41).t;
      const k43 = general.find((k) => k.k === 43).t;
      const tableData = {
        title: 'Genel',
        ilk_tur: {
          rte: k41.toLocaleString(),
          rte_percent: (100*k41 / (k41 + k43)).toLocaleString(),
          kk: k43.toLocaleString(),
          kk_percent: (100*k43 / (k41+ k43)).toLocaleString(),
          diff: (k43 - k41).toLocaleString(),
        },
        ikinci_tur: {
          rte: 0,
          rte_percent: 0,
          kk: 0,
          kk_percent: 0,
          diff: 0,
        }
      };
      setTableData(tableData);

      const table = document.getElementById('table');
      table.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    const k41 = ilktur_data.c.find((k) => k.k === 41).t;
    const k43 = ilktur_data.c.find((k) => k.k === 43).t;
    const tableData = {
      title: ilktur_data.a,
      ilk_tur: {
        rte: k41.toLocaleString(),
        rte_percent: (100*k41 / (k41 + k43)).toLocaleString(),
        kk: k43.toLocaleString(),
        kk_percent: (100*k43 / (k41+ k43)).toLocaleString(),
        diff: (k43 - k41).toLocaleString(),
      },
      ikinci_tur: {
        rte: 0,
        rte_percent: 0,
        kk: 0,
        kk_percent: 0,
        diff: 0,
    }
    };
    setTableData(tableData);

    const table = document.getElementById('table');
    table.scrollIntoView({ behavior: 'smooth' });
  };



  useEffect(() => {
          fetch('https://raw.githubusercontent.com/hevirbek/turkey-map-svg/main/ilktur_data.json')
          .then((response) => response.json())
          .then((ilk) => {
            setIlktur(ilk);
            fetch('https://raw.githubusercontent.com/hevirbek/turkey-map-svg/main/turkiye.svg')
          .then((response) => response.text())
          .then((svgData) => {
            const parser = new DOMParser();

            const svg = parser.parseFromString(svgData, 'text/xml');
            const svgWithTooltips = addTooltipsToPaths(svgData);
            const svgWithColors = addColorsToPaths(svgWithTooltips, ilk.CB.YurtIci.b);
            
            const general = ilk.CB.YurtIci.c;
            const k41 = general.find((k) => k.k === 41).t;
            const k43 = general.find((k) => k.k === 43).t;

            const tableData = {
              title: 'Genel',
              ilk_tur: {
                rte: k41.toLocaleString(),
                rte_percent: (100*k41 / (k41 + k43)).toLocaleString(),
                kk: k43.toLocaleString(),
                kk_percent: (100*k43 / (k41+ k43)).toLocaleString(),
                diff: (k43 - k41).toLocaleString(),
              },
              ikinci_tur: {
                rte: 0,
                rte_percent: 0,
                kk: 0,
                kk_percent: 0,
                diff: 0,
              }
            };
            setTableData(tableData);

            setData(svgWithColors);
            setLoading(false);
          })
          .catch((error) => {
            setError(error.message);
            setLoading(false);
          });
          }
          )
    
  }, []);

  const addTooltipsToPaths = (svgData) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(svgData, 'image/svg+xml');
    const paths = xmlDoc.getElementsByTagName('path');

    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      path.style.cursor = 'pointer';
      path.style.fill = '#333333';

      const title = xmlDoc.createElement('title');
      const data_code = path.parentNode.getAttribute('data-iladi');
      const titleText = xmlDoc.createTextNode(data_code);
      title.appendChild(titleText);
      path.appendChild(title);
    }

    return new XMLSerializer().serializeToString(xmlDoc);
  };

  const addColorsToPaths =  (svgData, ilktur) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(svgData, 'image/svg+xml');
    const paths = xmlDoc.getElementsByTagName('path');

    for (let i = 0; i < paths.length; i++) {
      const path = paths[i];
      const data_code = path.parentNode.getAttribute('data-plakakodu');
      const data_code_int = parseInt(data_code);
      const ilktur_data = ilktur.find((il) => il.k === data_code_int);
      if (ilktur_data === undefined) {
        continue;
      }
      const ilktur_data_c = ilktur_data.c;
      const k41 = ilktur_data_c.find((k) => k.k === 41).t;
      const k43 = ilktur_data_c.find((k) => k.k === 43).t;
      if (k41 > k43) {
        path.style.fill = '#FF8000';
      } else if (k41 < k43) {
        path.style.fill = 'red';
      }
    }

    return new XMLSerializer().serializeToString(xmlDoc);
  };


  return (
    <div className='sm:block lg:grid grid-cols-3 gap-2 max-h-[90px]'>

      {/* Change tabs */}
      <div className='col-span-3'>
        <div className='flex justify-center items-center'>
          <button
            className={`${
              tab === 0 ? 'bg-gray-200' : 'bg-gray-100'
            } px-4 py-2 rounded-l-md`}
            onClick={() => setTab(0)}
          >
            İlk Tur
          </button>
          <button
            className={`${
              tab === 1 ? 'bg-gray-200' : 'bg-gray-100'
            } px-4 py-2 rounded-r-md`}
            onClick={() => setTab(1)}
          >
            İkinci Tur
          </button>
        </div>
      </div>

      <div className='p-10 w-full col-span-2'>
        {loading ? (
          <div>Loading...</div>
        ) : (
          tab === 0 ? 
          <Map data={data} handleCityClick={handleCityClick} /> 
          : 
          <div>İkinci Tur</div>
        )}
        {error && <div>{error}</div>}
      </div>

      <div id='table'>
        <Table tableData={tableData} />
      </div>
      

    </div>
  );
}

export default App;
