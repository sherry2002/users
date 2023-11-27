import React, { useEffect, useState } from "react";
import { MDBDataTable } from "mdbreact";

const UserList = ({ userList }) => {
  const UserWithImage = ({ name, imageSrc }) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src={imageSrc}
        alt={name}
        style={{
          width: "25px",
          height: "25px",
          borderRadius: "50%",
          marginRight: "10px",
        }}
      />
      <span>{name}</span>
    </div>
  );

  const data = {
    columns: [
      {
        label: "#",
        field: "id",
        sort: "asc",
        width: 40,
      },
      {
        label: "Email",
        field: "email",
        sort: "asc",
        width: 170,
      },
      {
        label: "Name",
        field: "name",
        sort: "asc",
        width: 190,
      },
      {
        label: "Phone No",
        field: "phone",
        width: 140,
      },
      {
        label: "Interview Timimg",
        field: "interview_time",
        width: 170,
      },
      {
        label: "Role",
        field: "role",
        width: 100,
      },
    ],
    rows: userList.map((list) => {
      return {
        ...list,
        name: <UserWithImage name={list.name} imageSrc={list.image} />,
      };
    }),
    // rows: [
    //   {
    //     name: 'Tiger Nixon',
    //     position: 'System Architect',
    //     office: 'Edinburgh',
    //     age: '61',
    //     date: '2011/04/25',
    //     salary: '$320'
    //   },
    //   {
    //     name: 'Garrett Winters',
    //     position: 'Accountant',
    //     office: 'Tokyo',
    //     age: '63',
    //     date: '2011/07/25',
    //     salary: '$170'
    //   },
    //   {
    //     name: 'Ashton Cox',
    //     position: 'Junior Technical Author',
    //     office: 'San Francisco',
    //     age: '66',
    //     date: '2009/01/12',
    //     salary: '$86'
    //   },
    //   {
    //     name: 'Cedric Kelly',
    //     position: 'Senior Javascript Developer',
    //     office: 'Edinburgh',
    //     age: '22',
    //     date: '2012/03/29',
    //     salary: '$433'
    //   },
    // ]
  };

  return (
    <div className="user_list">
      <div className="xlg font-weight-bold mb-4">Users List </div>
      <MDBDataTable
        striped
        ordered
        small
        scrollX
        scrollY
        maxHeight="350px"
        hover
        responsive={true}
        className="user_table"
        data={data}
      />
    </div>
  );
};

export default UserList;
