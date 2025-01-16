import { useRef } from "react"
import { CustomTable, CustomActions, Loading, Error } from "../../components/index"
import permissionsDefault  from '../../mocks/permissions.json'
import { useProfiles } from "../../hooks/useProfiles";

const statusMap = {
    1: 'Active',
    2: 'Inactive',
    3: 'Suspended'
};

const columns = [
    { header: 'Name', key: 'name' },
    {
        header: 'Status',
        key: 'status',
        render: (row) => statusMap[row.status] || 'Unknown'
    },
    {
        header: 'Actions',
        key: 'actions',
        render: (row, ActionsComponent) => <ActionsComponent row={row} />
    }
]

export const Profiles = () => {

    const firstLoad = useRef(true);

    const { profiles, loading, errorProfiles, getProfiles, activateProfile, deactivateProfile, editProfile } = useProfiles()

    if (firstLoad.current) {
        getProfiles();
        firstLoad.current = false;
    }

    const Actions = [
        {
            key: 'activate',
            Name: 'Activate',
            Condition: (row) => row.status !== 1,
            Handle: (id) => activateProfile(id)
        },
        {
            key: 'inactivate',
            Name: 'Inactivate',
            Condition: (row) => row.status === 1,
            Handle: (id) => deactivateProfile(id)
        },
        {
            key: 'edit',
            Name: 'Edit',
            Condition: (row) => true,
            Handle: (id) => editProfile(id)
        }
    ]

    if (loading) return <Loading />;
    if (errorProfiles) return <Error message={errorProfiles} />;

    return (
        <div className="container-fluid">
            <h2>Profiles</h2>
            <CustomTable 
                columns={columns} 
                rows={profiles} 
                ActionsComponent={(props) => (
                    <CustomActions
                        {...props}
                        permissions={permissionsDefault}
                        actions={Actions}
                    />
                )} />
        </div>  
    )
}
