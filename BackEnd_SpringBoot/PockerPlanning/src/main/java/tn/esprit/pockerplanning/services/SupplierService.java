package tn.esprit.pockerplanning.services;

import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Service;
import tn.esprit.pockerplanning.entities.Supplier;
import tn.esprit.pockerplanning.repositories.SupplierRepository;

import java.util.List;
import java.util.Properties;


@Service
public class SupplierService implements ISupplier {

	@Autowired
	SupplierRepository frepo;

	@Override
	public Supplier addSupplier(Supplier supplier)   {
		Supplier savedSupplier = frepo.save(supplier);

		return savedSupplier;
	}

	@Override
	public Supplier updateSupplier(Supplier f, Long id) {
		// TODO Auto-generated method stub
		Supplier ff = frepo.findById(id).get();
		ff.setAdress(f.getAdress());
		ff.setDateDelivery(f.getDateDelivery());
		ff.setHourDelivery(f.getHourDelivery());
		ff.setName(f.getName());
		ff.setNumPhone(f.getNumPhone());
		return frepo.save(ff);
	}

	@Override
	public void deleteSupplier(Long id) {
		// TODO Auto-generated method stub
		frepo.deleteById(id);
		
	}

	@Override
	public Supplier getSupplier(Long id) {
		// TODO Auto-generated method stub
		return frepo.findById(id).get();
	}

	@Override
	public List<Supplier> getSuppliers() {
		// TODO Auto-generated method stub
		return frepo.findAll();
	}
	}
