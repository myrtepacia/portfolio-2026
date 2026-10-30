import { Award, Eye } from 'lucide-react'
import { MonoLabel } from './SectionTitle'

type CertificateCardProps = {
  title: string
  provider: string
  image: string
  onView: () => void
  className?: string
}

// Certificate card shared by the home page and /certificates: image preview,
// label, title and provider, and a View Certificate button that opens it.
const CertificateCard = ({ title, provider, image, onView, className = '' }: CertificateCardProps) => (
  <li className={`flex flex-col overflow-hidden rounded-2xl border border-line bg-surface ${className}`}>
    {/* Preview only; the certificate opens from the View Certificate button below */}
    <div className='relative aspect-[16/10] overflow-hidden border-b border-line bg-wash'>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt='' loading='lazy' className='h-full w-full object-cover object-top' />
    </div>

    <div className='flex flex-1 flex-col p-4'>
      <div className='flex items-center justify-between gap-2'>
        <MonoLabel icon={<Award size={11} />}>Certificate</MonoLabel>
      </div>
      <h3 className='mt-3 text-[15px] font-semibold leading-snug'>{title}</h3>
      <p className='mt-1 text-xs text-muted'>{provider}</p>
    </div>

    <button
      type='button'
      onClick={onView}
      className='flex items-center justify-center gap-2 border-t border-line py-2.5 font-mono text-[11px] text-muted transition-colors hover:bg-wash hover:text-fg'
    >
      <Eye size={13} />
      View Certificate
    </button>
  </li>
)

export default CertificateCard
