import React, { Component, PropTypes } from "react";
import ReactDOM from "react-dom";
import Collapse from "react-collapse";
import "./style.less";
import { EditIcon, CheckMarkIcon } from "dnn-svg-icons";
import resx from "../../../resources";

class ProviderRow extends Component {
    constructor() {
        super();
    }

    componentWillMount() {
        let opened = (this.props.openId !== "" && this.props.name === this.props.openId);
        this.setState({
            opened
        });
    }

    toggle() {
        if ((this.props.openId !== "" && this.props.name === this.props.openId)) {
            this.props.Collapse();
        } else {
            this.props.OpenCollapse(this.props.name);
        }
    }

    /* eslint-disable react/no-danger */
    getEnabledDisplay() {
        const {props} = this;
        if (props.enabled) {
            return (
                <div className="item-row-enabled-display">
                    <div className="enabled-icon" dangerouslySetInnerHTML={{ __html: CheckMarkIcon }} />
                </div>
            );
        }
        else {
            return (
                <div>&nbsp;</div>
            );
        }
    }

    /* eslint-disable react/no-danger */
    render() {
        const {props, state} = this;
        let opened = (this.props.openId !== "" && this.props.name === this.props.openId);
        if (props.visible) {
            return (
                <div className={"collapsible-component-providers" + (opened ? " row-opened" : "")}>
                    <div className={"collapsible-providers " + !opened} >
                        <div className={"row"}>
                            <div className="provider-item item-row-name">
                                {props.name}
                            </div>
                            <div className="provider-item item-row-enabled">
                                {this.getEnabledDisplay()}
                            </div>
                            <div className="provider-item item-row-priority">
                                {props.priority}
                            </div>
                            <div className="provider-item item-row-editButton">
                                <div className={opened ? "edit-icon-active" : "edit-icon"} dangerouslySetInnerHTML={{ __html: EditIcon }} onClick={this.toggle.bind(this)} />
                            </div>
                        </div>
                    </div>
                    <Collapse accordion={true} isOpened={opened} style={{ float: "left" }} fixedHeight={160}>{opened && props.children}</Collapse>
                </div>
            );
        }
        else {
            return <div />;
        }
    }
}

ProviderRow.propTypes = {
    name: PropTypes.number,
    enabled: PropTypes.bool,
    priority: PropTypes.number,
    overridePriority: PropTypes.bool,
    OpenCollapse: PropTypes.func,
    Collapse: PropTypes.func,
    id: PropTypes.string,
    openId: PropTypes.string,
    visible: PropTypes.bool
};

ProviderRow.defaultProps = {
    collapsed: true,
    visible: true
};

export default (ProviderRow);