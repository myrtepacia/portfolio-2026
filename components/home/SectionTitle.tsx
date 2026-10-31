type SectionTitleProps = {
  title: string
  subtitle: string
}

const SectionTitle = ({ title, subtitle }: SectionTitleProps) => (
  <div className='mb-8'>
    {/* One line on every phone: the size scales with the screen (up to 28px) instead of wrapping */}
    <h2 className='whitespace-nowrap text-[clamp(20px,6.4vw,28px)] font-bold tracking-[-0.03em] sm:text-[32px]'>{title}</h2>
    <p className='mt-2 text-[15px] text-muted'>{subtitle}</p>
  </div>
)

// Small uppercase mono label used inside cards ("KEY HIGHLIGHTS", etc.)
export const MonoLabel = ({ icon, children }: { icon?: React.ReactNode; children: React.ReactNode }) => (
  <p className='flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-subtle'>
    {icon}
    {children}
  </p>
)

export default SectionTitle
