import React from "react";

const TaskManager = React.lazy(()=> import('./modules/TaskManager/task-manager'));
// const AchievementManagement = React.lazy(() => import('./modules/achievement-management/achievement-management'));
// const ProcecurementPlan = React.lazy(() => import('./modules/procecurement-plan/procecurement-plan'));
// const ProcurementList = React.lazy(() => import('./modules/procurement-list/procurement-list'))

const route = [

    { path: '/TaskManager/task-manager', exact: true, name: 'construction-list', component: TaskManager  },
    // { path: '/procecurement/procecurement-plan', exact: true, name: 'procecurement-plan', component: ProcecurementPlan },
    // { path: '/achive-management/achievement-management', exact: true, name: 'achievement-management', component: AchievementManagement },
    // { path: '/procurement/procurement-list', exact: true, name: 'procurement-list', component: ProcurementList }
]

export default route;