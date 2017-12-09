import React, {Component} from 'react';

class Hours extends Component {

  render() {

    const { hours } = this.props;

    return (hours) && (

      <div className="coa-section__map">
        <h5>Hours</h5>
        <table className="usa-table-borderless">
          <thead className="usa-sr-only">
            <tr>
              <th scope="col">Day</th>
              <th scope="col">Open - Close Hours</th>
            </tr>
          </thead>
          <tbody>
          {
            Object.entries(hours).map((hour, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{hour[0]}</th>
                  <td>{hour[1]}</td>
                </tr>
              );
            })
          }
          </tbody>
        </table>
      </div>
    );

  }
}

export default Hours;
