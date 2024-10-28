import React from 'react';
import '../style/TicketCard.css'
import { 
  Signal, 
  AlertTriangle,
  MoreHorizontal,
  Plus,
  Circle,
  Loader,
  ListMinus
} from 'lucide-react';

const images = [
    "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1673866484792-c5a36a6c025e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1502323777036-f29e3972d82f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1503235930437-8c6293ba41f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1533636721434-0e2d61030955?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
    "https://plus.unsplash.com/premium_photo-1710911198710-3097c518f0e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
    "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1675129522693-bd62ffe5e015?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1499557354967-2b2d8910bcca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1618193139062-2c5bf4f935b7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29uJTIwbG9nb3xlbnwwfHwwfHx8MA%3D%3D",
];

const ICONS = {
  status: {
    'Todo': <Circle size={16} />,
    'In progress': <Loader size={16} />,
    'Backlog': <ListMinus size={16} />
  },
  priority: {
    0: <MoreHorizontal size={16} />,
    1: <Signal size={16} />,
    2: <Signal size={16} style={{ fill: 'orange' }} />,
    3: <Signal size={16} style={{ fill: 'yellow' }} />,
    4: <AlertTriangle size={16} color="red" />
  }
};

const PRIORITY_LABELS = {
  0: 'No priority',
  1: 'Low',
  2: 'Medium',
  3: 'High',
  4: 'Urgent'
};

const TicketCard = ({ tickets, assignee, priorityLevel, viewType, status, checkUserStatus }) => {
  // Function to get image based on userId or index
  const getImageForUser = (userId) => {
    // Convert userId to a number and use modulo to cycle through images
    const index = typeof userId === 'string' 
      ? parseInt(userId.replace(/\D/g, ''), 10) 
      : userId;
    return images[index % images.length];
  };

  const renderStatusIcon = (state) => (
    <span className="status-icon">
      {ICONS.status[state] || ICONS.status['Todo']}
    </span>
  );

  const renderGroupHeader = () => {
    switch(viewType) {
      case 'status':
        return (
          <div className="group-header-content">
            {renderStatusIcon(status)}
            <span>{status}</span>
          </div>
        );
      case 'priority':
        return (
          <div className="group-header-content">
            {ICONS.priority[priorityLevel]}
            <span>{PRIORITY_LABELS[priorityLevel]}</span>
            <span className="ticket-count">{tickets?.length || 0}</span>
          </div>
        );
      default:
        return (
          <div className="group-header-content">
            <div className="avatar">
              <img 
                src={assignee ? getImageForUser(assignee.id) : images[0]} 
                alt={`${assignee?.name || 'User'}'s avatar`}
                className="avatar-image" 
              />
            </div>
            <span>{assignee?.name}</span>
            <span className="ticket-count">{tickets?.length || 0}</span>
          </div>
        );
    }
  };

  const renderTicket = (ticket) => {
    const userAvailable = checkUserStatus(ticket.userId);
    
    return (
      <div key={ticket.id} className="ticket-item">
        <div className="ticket-header">
          <span className="ticket-id">{ticket.id}</span>
          {viewType !== 'user' && (
            <div className="user-avatar">
              <img 
                src={getImageForUser(ticket.userId)}
                alt="User avatar"
                className={`avatar-image ${userAvailable ? 'available' : ''}`}
              />
            </div>
          )}
        </div>

        <div className="ticket-content">
          {viewType === 'status' ? null : renderStatusIcon(ticket.status)}
          <p className="ticket-title">{ticket.title}</p>
        </div>

        <div className="ticket-footer">
          {viewType !== 'priority' && (
            <>
              <button className="action-button">
                <MoreHorizontal size={16} />
              </button>
              <div className="tag">
                {ICONS.priority[priorityLevel]}
                <span>Feature Request</span>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="ticket-group">
      <div className="group-header">
        {renderGroupHeader()}
        <div className="header-actions">
          <button className="action-button">
            <Plus size={16} />
          </button>
          <button className="action-button">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>
      <div className="tickets-container">
        {tickets?.map(renderTicket)}
      </div>
    </div>
  );
};

export default TicketCard;