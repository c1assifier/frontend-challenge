import '@/shared/ui/NavTabs.css'

export interface NavTab {
  label: string
  active: boolean
}

interface NavTabsProps {
  tabs: NavTab[]
  onTabChange?: (label: string) => void
}

export function NavTabs({ tabs, onTabChange }: NavTabsProps) {
  return (
    <nav className="nav-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.label}
          type="button"
          className={`nav-tabs__tab${tab.active ? ' nav-tabs__tab--active' : ''}`}
          onClick={() => onTabChange?.(tab.label)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  )
}
