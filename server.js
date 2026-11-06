// Mona's Hostel Management - Express + MySQL API
// Setup: npm install, create database with schema.sql, then npm start
const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
const pool = mysql.createPool({host:process.env.DB_HOST||'localhost',user:process.env.DB_USER||'root',password:process.env.DB_PASSWORD||'',database:process.env.DB_NAME||'monas_hostel',waitForConnections:true,connectionLimit:10});
const columns = ['resident_name','room_no','phone','email','guardian','monthly_fee','check_in','check_out','fee_status','stay_status','address'];
function cleanBody(body){const out={};for(const k of columns)if(Object.prototype.hasOwnProperty.call(body,k))out[k]=body[k]===''?null:body[k];return out;}
app.get('/residents',async(req,res)=>{try{const [rows]=await pool.query('SELECT * FROM residents ORDER BY resident_id DESC');res.json(rows)}catch(e){console.error(e);res.status(500).json({message:'Could not load residents. Check database settings and schema.sql.'})}});
app.get('/residents/:id',async(req,res)=>{try{const [rows]=await pool.execute('SELECT * FROM residents WHERE resident_id = ?', [req.params.id]);if(!rows.length)return res.status(404).json({message:'Resident not found'});res.json(rows[0])}catch(e){console.error(e);res.status(500).json({message:'Could not find resident'})}});
app.post('/residents',async(req,res)=>{const data=cleanBody(req.body);if(!data.resident_name||!data.room_no||!data.phone||data.monthly_fee===undefined||data.monthly_fee===null||!data.check_in)return res.status(400).json({message:'Name, room number, phone, monthly fee and check-in date are required.'});try{const keys=Object.keys(data);const [result]=await pool.query(`INSERT INTO residents (${keys.join(',')}) VALUES (${keys.map(()=>'?').join(',')})`,keys.map(k=>data[k]));res.status(201).json({message:'Resident added successfully.',resident_id:result.insertId})}catch(e){console.error(e);res.status(500).json({message:e.code==='ER_DUP_ENTRY'?'That resident or room record conflicts with an existing unique value.':'Could not add resident. Check the submitted values.'})}});
app.put('/residents/:id',async(req,res)=>{const data=cleanBody(req.body);delete data.resident_id;if(!Object.keys(data).length)return res.status(400).json({message:'No resident fields were provided.'});try{const keys=Object.keys(data);const [result]=await pool.query(`UPDATE residents SET ${keys.map(k=>`${k} = ?`).join(', ')} WHERE resident_id = ?`,[...keys.map(k=>data[k]),req.params.id]);if(!result.affectedRows)return res.status(404).json({message:'Resident not found, or no changes were made.'});res.json({message:'Resident details updated successfully.'})}catch(e){console.error(e);res.status(500).json({message:'Could not update resident. Check the submitted values.'})}});
app.delete('/residents/:id',async(req,res)=>{try{const [result]=await pool.execute('DELETE FROM residents WHERE resident_id = ?', [req.params.id]);if(!result.affectedRows)return res.status(404).json({message:'Resident not found.'});res.json({message:'Resident removed successfully.'})}catch(e){console.error(e);res.status(500).json({message:'Could not remove resident.'})}});
app.use((req,res)=>res.sendFile(path.join(__dirname,'public','index.html')));
app.listen(PORT,()=>console.log(`Mona's Hostel Management running at http://localhost:${PORT}`));
