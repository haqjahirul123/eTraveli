import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getMovies } from "./helper";
import Loading from "./components/Loading";
import Details from "./components/Details";

function App() {
  const [movies, setMovies] = useState([]);
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentRowItem, setCurrentRowItem] = useState(null);
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    getMovies(setMovies, setLoading, setDatas);
  }, []);

  const filterData = (keywords) => {
    // console.log("v", value)
    if (!keywords) {
      setMovies(datas);
      return;
    }
    setLoading(true);
    const regex = new RegExp(keywords?.toLowerCase());
    let newDta = datas?.filter(
      (item) =>
        regex.test(item?.fields?.title?.toLowerCase()) ||
        regex.test(item?.episode?.toLowerCase()) ||
        regex.test(item?.fields?.release_date)
    );
    setMovies(newDta);
    setLoading(false);
  };

  const sortData = (sortBy) => {
    let newData = [...datas];
    newData.sort((a, b) => {
      if (sortBy === "release_date") {
        return new Date(a?.fields?.[sortBy]) - new Date(b?.fields?.[sortBy]);
      } else {
        return a?.fields?.[sortBy] - b?.fields?.[sortBy];
      }
    });
    console.log("n", newData);
    setMovies(newData);
  };

  return (
    <div className="start">
      {loading && <Loading />}
      {/* <h1 className="heading">eTravelli</h1> */}
        <div className="content">
          <div className="drp">
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic">Sort by...</Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>
                  <div
                    onClick={() => setMovies(datas)}
                    className="d-flex justify-content-around align-items-center"
                  >
                    <span>Sort by</span>
                    <i className="fas fa-times"></i>
                  </div>
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item className="dropdown-item-one">
                  <div
                    onClick={() => {
                      sortData("episode_id");
                    }}
                  >
                    Episode
                  </div>
                </Dropdown.Item>
                <Dropdown.Item>
                  <div
                    onClick={() => {
                      sortData("release_date");
                    }}
                  >
                    Year
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="search-box d-flex">
            <i className="fas fa-search"></i>
            <input
              value={searchKey}
              onChange={(e) => {
                setSearchKey(e.target.value);
                filterData(e.target.value);
              }}
              placeholder="Type to search..."
            />
          </div>
        </div>
        <div className="container-fluid">
        <div className="row movie-section">
          <div className="col-lg-6 movie-list">
            <Table responsive className="mt-2">
              <tbody>
                {movies?.map((item, index) => (
                  <tr
                    className={item?.id === currentRowItem?.id ? "active" : ""}
                    onClick={() => setCurrentRowItem(item)}
                    key={index}
                  >
                    <td>{item?.episode}</td>
                    <td>{item?.fields?.title}</td>
                    <td>{item?.fields?.release_date}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div
            className={
              currentRowItem
                ? "col-lg-6"
                : "col-lg-6 right d-flex justify-content-center align-items-center"
            }
          >
            {currentRowItem ? (
              <Details item={currentRowItem} />
            ) : (
              <h4>No Movie Selected</h4>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
