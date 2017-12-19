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
            hours.map((hour, index) =>
              <tr key={index}>
                <th scope="row">{hour.day_of_week}</th>
                <td>{hour.start_time} - {hour.end_time}</td>
              </tr>
            )
          }
          </tbody>
        </table>
      </div>
    );

  }
}

export default Hours;
