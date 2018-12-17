import React, {Component} from "react";
import InfiniteScroll from 'react-infinite-scroller';

export default class PostsContainer extends Component {
  render() {
    const loader = <div className="loader">Loading ...</div>;
    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.props.loadHomePosts}
        hasMore={this.props.hasMoreItems}
        loader={loader}>
        {this.props.posts}
      </InfiniteScroll>
    );
  }
}
