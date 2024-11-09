import mongoose from 'mongoose';

const scanSchema = new mongoose.Schema({
  domain: {
    type: String,
    required: true,
    trim: true
  },
  subdomains: [{
    type: String,
    trim: true
  }],
  dnsRecords: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  },
  sslInfo: {
    type: Map,
    of: mongoose.Schema.Types.Mixed
  },
  scanTime: Number,
  status: {
    type: String,
    enum: ['pending', 'scanning', 'completed', 'failed'],
    default: 'pending'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  vulnerabilities: [{
    type: String,
    severity: {
      type: String,
      enum: ['low', 'medium', 'high', 'critical']
    },
    description: String
  }]
}, {
  timestamps: true
});

scanSchema.index({ domain: 1, user: 1 });
scanSchema.index({ createdAt: -1 });

export default mongoose.model('Scan', scanSchema);