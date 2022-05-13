import React from 'react';
import $ from 'jquery';

export default class PersonForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      firstName: "",
      lastName: ""
    }
  }

  orgName(event) {
    this.setState({
      orgName: event.target.value 
    });
  }

  orgtext(event) {
    this.setState({
      orgText: event.target.value 
    });
  }

  save() {
    var context = this;

    $.ajax({
      url: "http://localhost:3000/api/v1/people/save",
      method: "POST",
      data: {
        id: context.state.id,
        orgName: context.state.firstName,
        orgText: context.state.lastName
      },
      success: function(response) {
        alert("Successfully" 
      },
      error: function(response) {
        alert("Error");
      }
    });
  }
 ProfilePage({ resource }) {
  return (
    <Suspense fallback={<h1>Loading profile...</h1>}>
      <ProfileDetails resource={resource} />
      <Suspense fallback={<h1>Loading posts...</h1>}>
        <ProfileTimeline resource={resource} />
      </Suspense>
    </Suspense>
  );
}

ProfileDetails({ resource }) {
  const user = resource.user.read();
  return <h1>{user.name}</h1>;
}

 ProfileTimeline({ resource }) {
  const posts = resource.posts.read();
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );}

  render() {
    return (
      <div>
        First Name:
        <input type="text" value={this.state.orgname} onChange={this.orgname.bind(this)} />
        Last Name:
        <input type="text" value={this.state.orgtext} onChange={this.orgtext.bind(this)} />
        <hr/>

        <button onClick={this.save.bind(this)}>
          next
        </button>
      </div>
    );
  }
}
