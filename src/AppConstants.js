import { textCenter } from '@patternfly/react-table';

export const SET_CELL_ACTIVITY = 'SET_CELL_ACTIVITY';

export const DEFAULT_CELL_STATE = [
    {
        title: 'id',
        isActive: true,
        isFilterable: false,
        isTrackable: false,
        transforms: [textCenter],
        cellTransforms: [textCenter],
    },{
        title: 'service',
        isActive: true,
        isFilterable: true,
        isTrackable: false,
        transforms: [textCenter],
        cellTransforms: [textCenter],
    },{
        title: 'source',
        isActive: true,
        isFilterable: true,
        isTrackable: false,
        transforms: [textCenter],
        cellTransforms: [textCenter],
    },{
        title: 'account',
        isActive: true,
        isFilterable: true,
        isTrackable: false,
        transforms: [textCenter],
        cellTransforms: [textCenter],
    },{
        title: 'payload_id',
        isActive: true,
        isFilterable: false,
        isTrackable: true,
        transforms: [textCenter],
        cellTransforms: [textCenter],
    },{
        title: 'inventory_id',
        isActive: true,
        isFilterable: true,
        isTrackable: false,
        transforms: [textCenter],
        cellTransforms: [textCenter],
    },{
        title: 'system_id',
        isActive: true,
        isFilterable: true,
        isTrackable: false,
        transforms: [textCenter],
        cellTransforms: [textCenter],
    },{
        title: 'status',
        isActive: true,
        isFilterable: true,
        isTrackable: false,
        transforms: [textCenter],
        cellTransforms: [textCenter],
    },{
        title: 'status_msg',
        isActive: true,
        isFilterable: true,
        isTrackable: false,
        transforms: [textCenter],
        cellTransforms: [textCenter],
    },{
        title: 'date',
        isActive: true,
        isFilterable: false,
        isTrackable: false,
        transforms: [textCenter],
        cellTransforms: [textCenter],
    },{
        title: 'created_at',
        isActive: true,
        isFilterable: false,
        isTrackable: false,
        transforms: [textCenter],
        cellTransforms: [textCenter],
    }
];