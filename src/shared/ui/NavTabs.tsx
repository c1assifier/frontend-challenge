import '@/shared/ui/NavTabs.css'

export interface NavTab {
  label: string
  active: boolean
}

interface NavTabsProps {
  tabs: NavTab[]
}

export function NavTabs({ tabs }: NavTabsProps) {
  return (
    <nav className="nav-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.label}
          type="button"
          className={`nav-tabs__tab${tab.active ? ' nav-tabs__tab--active' : ''}`}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  )
}
