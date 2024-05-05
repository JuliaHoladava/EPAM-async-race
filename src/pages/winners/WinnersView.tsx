import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PropsWinners } from '../../types/interfaces';
import { RootState } from '../../redux/store';
import RaceResultsTable from '../../components/RaceResultsTable/RaceResultsTable';
import { fetchWinners } from '../../api/fetchWinners';
import { setWinners } from '../../redux/reducers/winnerSlice';
import pagination from '../../utils/pagination';
import { setPageNumber } from '../../redux/reducers/paginationSlice';
import Pagination from '../../components/Pagination/Pagination';
import '../../components/RaceResultsTable/RaceResultsTable.css';

const WinnersView = (): ReactElement => {
  const dispatch = useDispatch();
  const winners: PropsWinners[] = useSelector(
    (state: RootState) => state.winner.winners,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const pageSize = 10;
  const currentPage = useSelector(
    (state: RootState) => state.pagination.pageNumber,
  );

  const paginatedWinners = pagination<PropsWinners>({
    items: winners,
    pageNumber: currentPage,
    pageSize,
  });

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setIsLoading(true);
      try {
        const winsData = await fetchWinners();
        dispatch(setWinners(winsData));
      } catch (error) {
        console.error('Error fetching winners: ', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  const handlePageChange = (page: number): void => {
    dispatch(setPageNumber(page));
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="heading-block">
        <h2 className="heading">Winners ({winners.length} records)</h2>
        <Pagination
          total={winners.length}
          current={currentPage}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
      </div>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th className="table__row table__heading">ID</th>
              <th className="table__row table__heading">Car</th>
              <th className="table__row table__heading">Name</th>
              <th className="table__row table__heading">Count wins</th>
              <th className="table__row table__heading">Best time, s</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td>
                  <p>Loading winners...</p>
                </td>
              </tr>
            ) : winners.length > 0 ? (
              paginatedWinners.map((winner) => (
                <RaceResultsTable
                  key={winner.id}
                  index={winner.id}
                  name={winner.name}
                  color={winner.color}
                  wins={winner.wins}
                  time={winner.time}
                />
              ))
            ) : (
              <tr>
                <td>
                  <p>No cars found</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default WinnersView;
