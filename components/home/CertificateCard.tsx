type CertificateCardProps = {
  title: string
  provider: string
  image: string
  onView: () => void
  className?: string
}

// Certificate card shared by the home page and /certificates: an image preview, a
// one-line title and provider, and a View Credential button that opens it.
const CertificateCard = ({ title, provider, image, onView, className = '' }: CertificateCardProps) => (
  <li className={`flex min-w-0 flex-col rounded-2xl border border-line bg-surface p-4 ${className}`}>
    {/* Preview only; the certificate opens from the button below. object-contain on
        white shows the whole certificate, including tall ones like the NC II */}
    <div className='aspect-[7/5] overflow-hidden rounded-lg bg-white'>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image} alt='' loading='lazy' className='h-full w-full object-contain' />
    </div>

    <h3 className='mt-4 truncate text-[15px] font-semibold' title={title}>{title}</h3>
    <p className='mt-1 truncate text-xs text-muted' title={provider}>{provider}</p>

    <button
      type='button'
      onClick={onView}
      className='mt-4 w-full cursor-pointer rounded-lg border border-line bg-bg py-2 text-[13px] font-medium transition-colors hover:bg-wash'
    >
      View Credential
    </button>
  </li>
)

export default CertificateCard
