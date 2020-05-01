import isEmpty from "lodash/isEmpty";
import { BootstrapAlert } from "../../bootstrap/bootstrapAlert";
import React, { Component } from 'react';


export default class AwayLogAlertComponent extends Component {
    render() {
        const { associate } = this.props;

        if (isEmpty(associate) || isEmpty(associate.awayLog)) {
            return null;
        }
        const { awayLog } = associate;

        let messageHtml = "";
        switch (awayLog.reason) {
            case 1:
                messageHtml = (
                    <div>
                        <i class="fas fa-umbrella"></i>&nbsp;{awayLog.reasonOther}
                    </div>
                );
                break;
            case 2:
                messageHtml = (
                    <div>
                        <i class="fas fa-plane"></i>&nbsp;Going on vacation
                    </div>
                );
                break;
            case 3:
                messageHtml = (
                    <div>
                        <i class="fas fa-home"></i>&nbsp;Personal reasons
                    </div>
                );
                break;
            case 4:
                messageHtml = (
                    <div>
                        <i class="fas fa-university"></i>&nbsp;Commercial insurance expired
                    </div>
                );
                break;
            case 5:
                messageHtml = (
                    <div>
                        <i class="fas fa-university"></i>&nbsp;Police check expired
                    </div>
                );
                break;
            default:
                return (null)
                break;
        }

        return (
            <BootstrapAlert type='warning' value={messageHtml} />
        );
    }
}
