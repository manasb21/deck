import * as React from 'react';
import { MouseEvent } from 'react';
import { BindAll } from 'lodash-decorators';
import { UISref } from '@uirouter/react';
import { UIRouterContext } from '@uirouter/react-hybrid';

import { Tooltip } from 'core/presentation';

import './projectSummaryPod.less';

export interface IProjectSummaryPodProps {
  id: string;
  projectName: string;
  applications: string[];
  onRemoveProject?: (projectName: any) => void;
}

@UIRouterContext
@BindAll()
export class ProjectSummaryPod extends React.Component<IProjectSummaryPodProps> {
  private handleRemoveClicked(evt: MouseEvent<any>) {
    evt.preventDefault();
    this.props.onRemoveProject(this.props.id);
  }

  public render() {
    const { projectName, applications, onRemoveProject } = this.props;
    const showRemoveButton = !!onRemoveProject;

    return (
      <div className="infrastructure-project">
        <div className="project-summary">
          <div className="project-name">
            <UISref to="home.project.dashboard" params={{ project: projectName }}>
              <a>{projectName}</a>
            </UISref>

            {showRemoveButton && (
              <span className="small clickable remove-result-link" onClick={this.handleRemoveClicked}>
                <Tooltip value="remove from history" placement="left" delayShow={300}>
                  <span className="glyphicon glyphicon-remove"/>
                </Tooltip>
              </span>
            )}
          </div>
          <div className="application-count">
            {applications.length || 0} Application{applications.length !== 1 ? 's' : ''}
          </div>
        </div>

        <ul className="application-list">
          {applications.map(application => (
            <li key={application}>
              <UISref to="home.project.application.insight.clusters" params={{ project: projectName, application }}>
                <a>{application}</a>
              </UISref>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}