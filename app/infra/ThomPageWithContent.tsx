import React from 'react';

interface ComponentWithProps { }


/**
 * HOC that has the navbar, etc for the webside content.
 * @param PageContent the content of the page
 * @returns the page with the common website components.
 */
const thomPage = <P extends object>(PageContent: React.ComponentType<P>) =>

  class ThomPageWithContent extends React.Component<P & ComponentWithProps> {

    render() {
      const { ...props } = this.props;
      return (
        <div id="App" >
          <PageContent {...props} />
        </div>
      );
    }
  }

export default thomPage;