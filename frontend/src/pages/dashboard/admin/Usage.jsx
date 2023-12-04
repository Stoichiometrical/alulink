import React, { useState, useEffect } from 'react';
import DashFrame from '../../../components/dashframe/DashboardFrame';
import '../dash.scss';
import './admin.scss'
import EditableEventCard from '../../../components/eventcard/EditableEvent';
import DashHero from '../../../components/hero/DashHero';
import SearchBar from '../../../components/searchbar/Searchbar';
import { useAuth } from '../../../utils/AuthContext';

export default function Usage() {
  return (
    <>
      <DashHero name="Admin" />
      <DashFrame main={<UsageDashboard/>} isAdmin={true} />
    </>
  );
}

export function UsageDashboard(){
    return(
        <div className='usage'>
            <h1>Usage Statistics</h1>

            <div className='usage-1'>
                <div className='number'>
                    <h1>8</h1>
                    <div className='number-txt'>Total Events</div>
                </div>

                <div className='number'>
                    <h1>8</h1>
                    <div className='number-txt'>Alumni Joined</div>
                </div>


            </div>
       

        
        </div>
    )
}