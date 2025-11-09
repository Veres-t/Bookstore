// components/Tabs/Tabs.tsx
import React from 'react';
import styled from 'styled-components';

export interface TabsProps { // Добавляем export
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange }) => {
  return (
    <TabsContainer>
      {tabs.map(tab => (
        <Tab
          key={tab}
          $active={activeTab === tab}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </Tab>
      ))}
    </TabsContainer>
  );
};

const TabsContainer = styled.div`
  display: flex;
  border-bottom: 1px solid #e1e5e9;
  margin: 32px 0;
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: 16px 24px;
  border: none;
  background: none;
  font-size: 16px;
  font-weight: ${props => props.$active ? '600' : '400'};
  color: ${props => props.$active ? '#000' : '#666'};
  border-bottom: 2px solid ${props => props.$active ? '#000' : 'transparent'};
  cursor: pointer;
  
  &:hover {
    color: #000;
  }
`;