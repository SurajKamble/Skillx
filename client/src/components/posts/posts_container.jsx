import React, {Component} from "react";
import InfiniteScroll from 'react-infinite-scroller';

export default class PostsContainer extends Component {
  render() {
    const loader = <div className="loader" key='1'>Loading ...</div>;
    return (
      <div key={this.props.keyId}>
      <InfiniteScroll
        pageStart={0}
        initialLoad={true}
        loadMore={this.props.loadHomePosts}
        hasMore={this.props.hasMoreItems}
        loader={loader}>
        {this.props.posts}
      </InfiniteScroll>
      </div>
    );
  }
}
