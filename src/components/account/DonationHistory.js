import React from 'react';
import { useState, useEffect, useMemo } from "react";
import Pagination from "../pagination/Pagination";
import dateFormat from 'dateformat';
import {Input, FormFeedback} from 'reactstrap';
import { baseUrl } from '../../shared/baseUrl';

function DonationHistory(props) {
    const [donationHistoryData, setDonationHistoryData] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [searchType, setSearchType] = useState('');
    const [display, setDisplay] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [PageSize, setPageSize] = useState(5);
    const [totalCount, setTotalCount] = useState(donationHistoryData.length);

    useEffect(() => {
        fetch(baseUrl + `donation/history/${props.username}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error ' + response.status + ': ' + response.statusText);
            }
            return response.json();
        })
        .then((data) => {
            setDonationHistoryData(data.donations.reverse());
        })
        .catch((err) => {
            setError('There are some errors when loading database. Please try again!');
            setDisplay(false);
        })
    }, [props.username]);
    const sortFunction = (e) => {
        let newData
        const sortType = e.target.value;
        switch (true) {
            case (sortType === 'eventName'):
                newData = donationHistoryData.sort((a,b) => a.eventName.localeCompare(b.eventName));
                break;
            case (sortType === 'amount'):
                newData = donationHistoryData.sort((a,b) => a.amount - b.amount);
                break;
            case (sortType === 'donationDate'):
                newData = donationHistoryData.sort((a,b) => new Date(a.donationDate).getTime() - new Date(b.donationDate).getTime());
                break;
            default:
                newData = donationHistoryData;
        }
        setDonationHistoryData([...newData]);
    }
    const dataWithPagination = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        const newData = donationHistoryData.filter((x) => {
            if (searchType === "eventName") {  
                return(x.eventName.toLowerCase().includes(keyword.toLowerCase()))
            } else if (searchType === "eventId") {  
                return(x.eventId.toLowerCase().includes(keyword.toLowerCase()))   
            } else if (searchType === "gteAmount") {
                return (x.amount >= keyword)
            } else if (searchType === "ltAmount") {
                return (x.amount < keyword)
            } else if (searchType === "pending") {
                return (x.donationStatus === 'pending')
            } else if (searchType === "failed") {
                return (x.donationStatus === 'failed')
            } else if (searchType === "successful") {
                return (x.donationStatus === 'successful')
            } else {
                return x
            }
            });
        setTotalCount(newData.length);
        if (PageSize >= newData.length) {setCurrentPage(1)}
        return newData.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, PageSize, donationHistoryData, keyword, searchType]);
   
    return(
        <div>
            <div className="page-header">
                <div className="left ml-4">
                    <h1 className="page-title">Donation History</h1>
                </div>
            </div>
            <div className="tab-content">
                <div className="tab-pane show active">
                    <div className="card mb-0" style={{minHeight: '100vh'}}>
                        <div className="card-header">
                            <div className="header-action">
                                <div className="small ml-1">
                                    <a href="#!" className={searchType === '' ? "text-decoration-none" : "text-decoration-none text-secondary"} onClick={()=> setSearchType('')}>All ({donationHistoryData.length})</a> |&nbsp;
                                    <a href="#!" className={searchType === 'pending' ? "text-decoration-none" : "text-decoration-none text-secondary"} onClick={()=> setSearchType('pending')}>Pending ({donationHistoryData.filter((x) => x.donationStatus === 'pending').length})</a> |&nbsp;
                                    <a href="#!" className={searchType === 'successful' ? "text-decoration-none" : "text-decoration-none text-secondary"} onClick={()=> setSearchType('successful')}>Successful ({donationHistoryData.filter((x) => x.donationStatus === 'successful').length})</a> |&nbsp;
                                    <a href="#!" className={searchType === 'failed' ? "text-decoration-none" : "text-decoration-none text-secondary"} onClick={()=> setSearchType('failed')}>Failed ({donationHistoryData.filter((x) => x.donationStatus === 'failed').length})</a>
                                </div>
                            </div>
                            <div className="card-options">
                                <div className="input-group">
                                    <input type="text" className="form-control form-control-sm" style={{width: '200px'}} placeholder="Enter keyword..." name="keyword" onChange={(e)=> setKeyword(e.target.value)}/>
                                    <select className="custom-select" style={{width: '140px'}} name="searchType" onChange={(e) => setSearchType(e.target.value)}>
                                        <option value="">Search by</option>
                                        <option value="eventName">Name</option>
                                        <option value="eventId">Event ID</option>
                                        <option value="gteAmount">Greater than equal amount</option>
                                        <option value="ltAmount">Less than amount</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="card-header">
                            <div className="header-action">
                                <div className="input-group">
                                    <select className="custom-select" name="sortType" onChange={sortFunction}>
                                        <option value="">Sort by</option>
                                        <option value="eventName">Name</option>
                                        <option value="amount">Amount</option>
                                        <option value="donationDate">Date</option>
                                    </select>
                                    <select className="custom-select" name="pageSize" onChange={(e) => setPageSize(parseInt(e.target.value))}>
                                        <option value={PageSize}>Show</option>
                                        <option value="3">3 rows</option>
                                        <option value="5">5 rows</option>
                                        <option value="10">10 rows</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="form-group">
                                <Input type="hidden" className="form-control" valid={error === ''} invalid={error !== ''}/>
                                <FormFeedback className="text-center">{error}</FormFeedback>
                            </div>
                            { display &&
                                <div className="pagination-wrapper">
                                    <div className="table-responsive">
                                        <table className="table table-striped table-hover table-vcenter text-nowrap mb-0">
                                            <thead>
                                                <tr>
                                                    <th className="w60"></th>
                                                    <th>Event</th>
                                                    <th>Amount</th>
                                                    <th>Message</th>
                                                    <th>Date</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {dataWithPagination.map((historyData) => {
                                                    return (
                                                        <tr key={historyData._id}>
                                                            <td className="text-center" style={{minWidth: '60px'}}>
                                                                <img src={historyData.imageEventUrl} alt="Avatar" className="avatar rounded-0"/>
                                                            </td>
                                                            <td style={{maxWidth: '350px'}}>
                                                                <h6 className="mb-0 text-truncate">{historyData.eventName} </h6>
                                                                <span className="font-12"><em>{historyData.eventId}</em></span>
                                                            </td>
                                                            <td>{historyData.amount.toLocaleString()}đ</td>
                                                            <td>{historyData.message}</td>
                                                            <td>{dateFormat(historyData.donationDate,"dd/mm/yyyy")}</td>
                                                            <td>
                                                                <span className={historyData.donationStatus === 'successful' ? 'tag tag-success' : historyData.donationStatus === 'failed' ? 'tag tag-indigo' : 'tag tag-yellow'}>{historyData.donationStatus}</span>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                    <Pagination
                                        className="pagination-bar"
                                        currentPage={currentPage}
                                        totalCount={totalCount}
                                        pageSize={PageSize}
                                        onPageChange={page => setCurrentPage(page)}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default DonationHistory
