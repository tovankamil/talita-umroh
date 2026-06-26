package models

import "time"

// Transaction status
const (
	TxStatusPending  = "pending"   // Baru daftar, belum upload bukti
	TxStatusWaiting  = "waiting"   // Bukti sudah diupload, menunggu verifikasi
	TxStatusPaid     = "paid"      // Sudah diverifikasi admin
	TxStatusRejected = "rejected"  // Bukti ditolak admin
)

// Transaction — transaksi pemesanan paket oleh agen/customer
type Transaction struct {
	ID                uint      `gorm:"primaryKey" json:"id"`
	InvoiceNumber     string    `gorm:"type:varchar(50);uniqueIndex;not null" json:"invoice_number"`
	CustomerID        uint      `gorm:"index;not null" json:"customer_id"`
	PackageID         uint      `gorm:"index;not null" json:"package_id"`
	DepartureID       *uint     `gorm:"index" json:"departure_id"`
	RoomTypeID        *uint     `gorm:"index" json:"room_type_id"`
	AgentID           uint      `gorm:"index;not null" json:"agent_id"`
	CompanyBankID     *uint     `gorm:"index" json:"company_bank_id"`
	BookingQty        int       `gorm:"not null;default:1" json:"booking_qty"`
	UnitPrice         float64   `gorm:"type:decimal(15,2);not null" json:"unit_price"`
	TotalAmount       float64   `gorm:"type:decimal(15,2);not null" json:"total_amount"`
	TransferredAmount float64   `gorm:"type:decimal(15,2);default:0" json:"transferred_amount"`
	PaymentProofURL   string    `gorm:"type:varchar(255)" json:"payment_proof_url"`
	Status            string    `gorm:"type:varchar(20);default:'pending'" json:"status"`
	VerifiedByID      *uint     `gorm:"index" json:"verified_by_id"`
	VerifiedAt        *time.Time `json:"verified_at"`
	CreatedAt         time.Time `json:"created_at"`
	UpdatedAt         time.Time `json:"updated_at"`

	// Relations
	Customer    *User               `gorm:"foreignKey:CustomerID" json:"customer,omitempty"`
	Package     *UmrohPackage       `gorm:"foreignKey:PackageID" json:"package,omitempty"`
	Departure   *PackageDeparture   `gorm:"foreignKey:DepartureID" json:"departure,omitempty"`
	RoomType    *PackageRoomType    `gorm:"foreignKey:RoomTypeID" json:"room_type,omitempty"`
	Agent       *User               `gorm:"foreignKey:AgentID" json:"agent,omitempty"`
	CompanyBank *CompanyBankAccount `gorm:"foreignKey:CompanyBankID" json:"company_bank,omitempty"`
	VerifiedBy  *User               `gorm:"foreignKey:VerifiedByID" json:"verified_by,omitempty"`
	Commissions []Commission        `gorm:"foreignKey:TransactionID" json:"commissions,omitempty"`
}

// Commission status
const (
	CommissionPending   = "pending"
	CommissionAvailable = "available"
	CommissionWithdrawn = "withdrawn"
)

// Commission — komisi agen dari transaksi yang diverifikasi
type Commission struct {
	ID            uint      `gorm:"primaryKey" json:"id"`
	AgentID       uint      `gorm:"index;not null" json:"agent_id"`
	TransactionID uint      `gorm:"index;not null" json:"transaction_id"`
	Amount        float64   `gorm:"type:decimal(15,2);not null" json:"amount"`
	Status        string    `gorm:"type:varchar(20);default:'pending'" json:"status"`
	CreatedAt     time.Time `json:"created_at"`
	UpdatedAt     time.Time `json:"updated_at"`

	// Relations
	Agent       *User        `gorm:"foreignKey:AgentID" json:"agent,omitempty"`
	Transaction *Transaction `gorm:"foreignKey:TransactionID" json:"transaction,omitempty"`
}

// Withdrawal status
const (
	WithdrawalPending  = "pending"
	WithdrawalApproved = "approved"
	WithdrawalRejected = "rejected"
)

// Withdrawal — permintaan pencairan komisi oleh agen
type Withdrawal struct {
	ID           uint       `gorm:"primaryKey" json:"id"`
	AgentID      uint       `gorm:"index;not null" json:"agent_id"`
	Amount       float64    `gorm:"type:decimal(15,2);not null" json:"amount"`
	Status       string     `gorm:"type:varchar(20);default:'pending'" json:"status"`
	ApprovedByID *uint      `gorm:"index" json:"approved_by_id"`
	RequestedAt  time.Time  `json:"requested_at"`
	ProcessedAt  *time.Time `json:"processed_at"`

	// Relations
	Agent      *User `gorm:"foreignKey:AgentID" json:"agent,omitempty"`
	ApprovedBy *User `gorm:"foreignKey:ApprovedByID" json:"approved_by,omitempty"`
}

// MarketingKit — materi pemasaran yang bisa didownload agen
type MarketingKit struct {
	ID           uint      `gorm:"primaryKey" json:"id"`
	Title        string    `gorm:"type:varchar(200);not null" json:"title"`
	FileURL      string    `gorm:"type:varchar(255);not null" json:"file_url"`
	FileType     string    `gorm:"type:varchar(30)" json:"file_type"` // brosur, flyer, presentasi
	UploadedByID uint      `gorm:"index;not null" json:"uploaded_by_id"`
	CreatedAt    time.Time `json:"created_at"`

	UploadedBy *User `gorm:"foreignKey:UploadedByID" json:"uploaded_by,omitempty"`
}
