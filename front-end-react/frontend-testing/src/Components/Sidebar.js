import React from 'react';

export default props => {
  return (
    <div>
      <ul>
	      <li><a className="menu-item" href="/">
	      	Admin Notices
	      	</a>
	      </li>

	      <li><a className="menu-item" href="/">
	        Club Notices
	      </a>
	      </li>

	      <li><a className="menu-item" href="/">
	        Department Notices
	      </a>
	      </li>

	      <li><a className="menu-item" href="/">
	        Faculty Notices
	      </a>
	      </li>

	      <li><a className="menu-item" href="/">
	        Workshops
	      </a>
	      </li>

	      <li> <a className="menu-item" href="/">
	        Seminars
	       </a>
	      </li>
      </ul>
    </div>
  );
};