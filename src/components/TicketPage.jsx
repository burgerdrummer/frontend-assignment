import React, { useState, useEffect } from 'react';
import TicketCard from './TicketCard'; // Renamed from Todo
import axios from 'axios';
import '../style/TicketPage.css'

const TicketManager = ({ setviewPreference, orderingCriteria, setOrderingCriteria }) => {
  const [ticketData, setTicketData] = useState({ tickets: [], users: [] });
  const [orderDirection, setOrderDirection] = useState('descending');
  const viewPreference = localStorage.getItem('viewPreference') || 'assignee';
  const viewOrdering = localStorage.getItem('viewOrdering') || 'assignee'
  const fetchTicketData = async () => {
    try {
      const response = await axios.get('https://api.quicksell.co/v1/internal/frontend-assignment');
      setTicketData(response.data);
      console.log(response.data)
      const storedView = localStorage.getItem('viewPreference');
      setviewPreference(storedView || 'assignee');
    } catch (error) {
      console.error('Failed to fetch ticket data:', error);
    }
  };

  useEffect(() => {
    fetchTicketData();
  }, []);

  const checkUserStatus = (assigneeId) => {
    const assignee = ticketData.users.find((user) => user.id === assigneeId);
    return assignee?.available;
  };

  // Sort users alphabetically
  const sortedUsers = [...ticketData.users].sort((a, b) => 
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );

  const toggleOrdering = (criteria) => {
    if (orderingCriteria === criteria) {
      setOrderDirection(prev => prev === 'ascending' ? 'descending' : 'ascending');
    } else {
      setOrderingCriteria(criteria);
      setOrderDirection(criteria === 'title' ? 'ascending' : 'descending');
    }
  };

  const handlePrioritySort = () => toggleOrdering('priority');
  const handleTitleSort = () => toggleOrdering('title');

  const organizeTickets = (tickets) => {
    return tickets.sort((a, b) => {
      if (orderingCriteria === 'priority') {
        const priorityDiff = a.priority - b.priority;
        return orderDirection === 'ascending' ? priorityDiff : -priorityDiff;
      }
      if (orderingCriteria === 'title') {
        const comparison = a.title.toLowerCase().localeCompare(b.title.toLowerCase());
        return orderDirection === 'ascending' ? comparison : -comparison;
      }
      return 0;
    });
  };

  const categorizeTickets = () => {
    const categories = {
      byAssignee: {},
      byStatus: {},
      byPriority: {}
    };

    ticketData.tickets.forEach(ticket => {
      // Categorize by assignee
      if (!categories.byAssignee[ticket.userId]) {
        categories.byAssignee[ticket.userId] = [];
      }
      categories.byAssignee[ticket.userId].push(ticket);

      // Categorize by status
      if (!categories.byStatus[ticket.status]) {
        categories.byStatus[ticket.status] = [];
      }
      categories.byStatus[ticket.status].push(ticket);

      // Categorize by priority
      if (!categories.byPriority[ticket.priority]) {
        categories.byPriority[ticket.priority] = [];
      }
      categories.byPriority[ticket.priority].push(ticket);
    });

    return categories;
  };

  const renderTicketGroups = () => {
    const categories = categorizeTickets();

    switch (viewPreference) {
      case 'status':
        return Object.entries(categories.byStatus).map(([status, tickets]) => (
          <TicketCard
            key={`status-${status}`}
            status={status}
            tickets={tickets}
            viewType={viewPreference}
            checkUserStatus={checkUserStatus}
          />
        ));
      case 'priority':
        return Object.entries(categories.byPriority).map(([priority, tickets]) => (
          <TicketCard
            key={`priority-${priority}`}
            priorityLevel={priority}
            tickets={tickets}
            viewType={viewPreference}
            checkUserStatus={checkUserStatus}
          />
        ));
      default:
        return sortedUsers.map(user => (
          <TicketCard
            key={`user-${user.id}`}
            assignee={user}
            tickets={categories.byAssignee[user.id] || []}
            checkUserStatus={checkUserStatus}
            viewType={viewPreference}
          />
        ));
    }
  };

  return (
    <div className="ticket-container">
      {renderTicketGroups()}
    </div>
  );
};

export default TicketManager;