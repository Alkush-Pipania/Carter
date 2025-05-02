import React from 'react';
import { SettingsDialog } from '../../../app/(main)/dashboard/_component/setting/settings-dialog';

interface SidebarSettingsProps {
  loading: boolean;
}

const SidebarSettings: React.FC<SidebarSettingsProps> = ({ loading }) => (
  <SettingsDialog loading={loading} />
);

export default SidebarSettings;
