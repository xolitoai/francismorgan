import { Tabs, TabList, Tab, TabPanel } from "react-aria-components";
import Title from "../ui/Title.astro";
import BulletPoint from "../ui/BulletPoint.astro";

type WorkItem = {
  id: string;
  title: string;
  description: string;
  highlights: string[];
  href: string;
};

type WorkTabsProps = {
  title: React.ReactNode;
  items: WorkItem[];
};

export function WorkTabs({ title, items }: WorkTabsProps) {
  if (!items.length) return null;

  return (
    <section className="mt-24 sm:mt-32">
      <h2 className="relative pl-4 text-xl sm:text-2xl font-semibold tracking-tight text-neutral-900 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-5 before:w-1 before:bg-indigo-600">
        {title}
      </h2>

      <Tabs defaultSelectedKey={items[0].id}>
        <div className="mt-10 p-8 sm:p-10 rounded-xl bg-white/90 shadow grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-10">
          {/* Tabs */}
          <nav>
            <TabList aria-label="Trabajo" className="space-y-2">
              {items.map((item) => (
                <Tab
                  key={item.id}
                  id={item.id}
                  className="block w-full text-left text-sm px-3 py-2 rounded-xl text-neutral-900 outline-none cursor-pointer data-selected:text-indigo-600 data-selected:bg-indigo-600/5 data-focus-visible:ring-2 data-focus-visible:ring-indigo-600 data-focus-visible:ring-offset-2"
                >
                  {item.title}
                </Tab>
              ))}
            </TabList>
          </nav>

          {/* Panels */}
          <div>
            {items.map((item) => (
              <TabPanel key={item.id} id={item.id}>
                <h3 className="text-2xl font-semibold tracking-tight text-neutral-900">
                  {item.title}
                </h3>

                <p className="mt-4 max-w-prose text-neutral-700">
                  {item.description}
                </p>

                <ul className="mt-6 space-y-2 text-sm">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-center gap-2">
                      <BulletPoint />
                      <span className="text-neutral-500">{highlight}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  {/* keeps your existing Link abstraction */}
                  <a
                    href={item.href}
                    className="text-sm inline-flex items-center gap-2 font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Ver más
                  </a>
                </div>
              </TabPanel>
            ))}
          </div>
        </div>
      </Tabs>
    </section>
  );
}
