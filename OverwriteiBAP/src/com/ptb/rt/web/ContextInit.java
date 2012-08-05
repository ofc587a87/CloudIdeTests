// Decompiled by DJ v3.5.5.77 Copyright 2003 Atanas Neshkov  Date: 8/5/2012 4:26:05 PM
// Home Page : http://members.fortunecity.com/neshkov/dj.html  - Check often for new version!
// Decompiler options: packimports(3) 
// Source File Name:   ContextInit.java

package com.ptb.rt.web;

import java.io.File;

import org.apache.camel.component.direct.DirectComponent;
import org.apache.camel.impl.DefaultCamelContext;
import org.picocontainer.MutablePicoContainer;
import org.picocontainer.Parameter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.context.support.XmlWebApplicationContext;
import org.zkoss.zk.ui.WebApp;
import org.zkoss.zk.ui.util.WebAppInit;

import org.springframework.security.web.FilterChainProxy;
import com.ptb.clerk.bpm.BPMNEngineManager;
import com.ptb.clerk.cache.ClerkCacheManagerImpl;
import com.ptb.clerk.conf.Configuration;
import com.ptb.clerk.conf.ConfigurationSchemaManagement;
import com.ptb.clerk.conf.IbapInfo;
import com.ptb.clerk.conf.Mode;
import com.ptb.clerk.conf.WebContext;
import com.ptb.clerk.conf.WebContextImpl;
import com.ptb.clerk.conf.cache.CacheCleaner;
import com.ptb.clerk.conf.schema.ConfigurationDDLGenerator;
import com.ptb.clerk.core.jms.JMSHelperImpl;
import com.ptb.clerk.deploy.desktop.AuxFormLoader;
import com.ptb.clerk.deploy.desktop.DesktopLoader;
import com.ptb.clerk.log.RollingLogFileHandler;
import com.ptb.clerk.persistence.api.core.CorePersistenceManager;
import com.ptb.clerk.persistence.api.database.DataSourceProvider;
import com.ptb.clerk.persistence.database.H2Server;
import com.ptb.clerk.pfe.api.var.DefaultNullValueRepresentation;
import com.ptb.clerk.pfe.impl.PageflowManagerImpl;
import com.ptb.clerk.psm.api.Index;
import com.ptb.clerk.psm.api.IndexListener;
import com.ptb.clerk.psm.api.PsmManager;
import com.ptb.clerk.rdfxml.RDFXMLMapperService;
import com.ptb.clerk.scomp.BCompListener;
import com.ptb.clerk.scomp.Compiler;
import com.ptb.clerk.scomp.project.ProjectMetadataGenerator;
import com.ptb.clerzk.tb.DefaultDecimalNumberFormat;
import com.ptb.external.services.IDGeneratorService;
import com.ptb.external.services.ModelBuilderService;
import com.ptb.external.services.SerializerService;
import com.ptb.model2.support.facade.GlobalModelFacade;
import com.ptb.project.api.ProjectManager;
import com.ptb.project.api.RepositoryManager;
import com.ptb.project.beans.helper.R2bHelper;
import com.ptb.project.impl.ProjectManagerImpl;
import com.ptb.project.impl.RepositoryManagerImpl;
import com.ptb.project.vc.api.VCManager;
import com.ptb.project.vc.impl.VCManagerImpl;
import com.ptb.rt.ProjectManagerFormatsRegister;
import com.ptb.scomp.PfuiTransformer;
import com.ptb.scomp.bpmn.activiti.BPMNTransformer;
import com.ptb.scomp.bpmn.activiti.pf.InitializationScriptGenerator;
import com.ptb.scomp.conf.ConfigurationTransformer;
import com.ptb.scomp.csql.CsqlTransformer;
import com.ptb.scomp.desktop.DesktopGenerator;
import com.ptb.scomp.ed.EdTransformer;
import com.ptb.scomp.i18n.I18NTransformer;
import com.ptb.scomp.impl.CompilerImpl;
import com.ptb.scomp.model.ConstantGenerator;
import com.ptb.scomp.model.ModelTransformer;
import com.ptb.scomp.model.XsdModelTransformer;
import com.ptb.scomp.pf.v5.GlobalVarDocTransformer;
import com.ptb.scomp.rdfxml.ConfigurableRdfXmlTransformer;
import com.ptb.scomp.reports.DOCXTransformer;
import com.ptb.scomp.ws.DeclaredHostTransformer;
import com.ptb.scomp.ws.WsTransformer;
import com.ptb.service.ServiceManager;
import com.ptb.sw.parsers.MemBasedNSManager;
import com.ptb.sw.parsers.NamespaceManager;
import com.ptb.sw.parsers.PreferredPrefixPolicy;
import com.ptb.sw.serial.Serializer;
import com.ptb.sw.serial.dimpl.DefaultSerializer;
import com.ptb.sw.util.GUIDGenerator;
import com.ptb.wsrt.client.WsSoapFactory;
import com.ptb.wsrt.core.error.WsErrorManager;
import com.ptb.wsrt.core.mapper.RDFXMLMapperServiceImpl;
import com.ptb.wsrt.core.metainfo.WsMetainfoManager;
import com.ptb.wsrt.server.soap.WsSoapServer;

// Referenced classes of package com.ptb.rt.web:
//            SkinManager, DownloadServiceListener

public class ContextInit
    implements WebAppInit
{

    public ContextInit()
    {
    }

    public void init(WebApp pWapp)
        throws Exception
    {
        LOG.debug("--> init()");
        _wapp = pWapp;
        _pico = (MutablePicoContainer)_wapp.getAttribute("pico");
        FilterChainProxy fcp = (FilterChainProxy)WebApplicationContextUtils.getRequiredWebApplicationContext(pWapp.getServletContext()).getBean("springSecurityFilterChain");
        _wapp.setAttribute("springSecurityFilterChain", fcp);
        configureContext();
        XmlWebApplicationContext xwac = (XmlWebApplicationContext)WebApplicationContextUtils.getWebApplicationContext(_wapp.getServletContext());
        //xwac.addApplicationListener(fcp.getSessionRegistry());
        System.setProperty("ibap.home", IbapInfo.getIbapHome());
        LOG.debug("<-- init");
    }

    private void configureContext()
        throws Exception
    {
        Configuration conf = (Configuration)_pico.getComponent(com.ptb.clerk.conf.Configuration.class);
        WebContext webContext = conf.getWebContext();
        _pico.addComponent(javax.servlet.ServletContext.class, _wapp.getServletContext(), new Parameter[0]);
        configureDataSource();
        _pico.addComponent(com.ptb.clerk.conf.schema.ConfigurationDDLGenerator.class, com.ptb.clerk.conf.schema.ConfigurationDDLGenerator.class, new Parameter[0]);
        _pico.addComponent(com.ptb.clerk.conf.ConfigurationSchemaManagement.class, com.ptb.clerk.conf.schema.ConfigurationSchemaManagementImpl.class, new Parameter[0]);
        webContext.setConfigurationSchemaManagement((ConfigurationSchemaManagement)_pico.getComponent(com.ptb.clerk.conf.ConfigurationSchemaManagement.class));
        ((WebContextImpl)webContext).setConfigurationDDLGenerator((ConfigurationDDLGenerator)_pico.getComponent(com.ptb.clerk.conf.schema.ConfigurationDDLGenerator.class));
        _pico.addComponent(com.ptb.sw.parsers.PreferredPrefixPolicy.class, PreferredPrefixPolicy.FIRST, new Parameter[0]);
        NamespaceManager nsManager = new MemBasedNSManager(PreferredPrefixPolicy.FIRST);
        _pico.addComponent(com.ptb.sw.parsers.NamespaceManager.class, nsManager, new Parameter[0]);
        ModelBuilderService mbService = new ModelBuilderService(nsManager);
        mbService.setContainersAsTriples(false);
        ServiceManager.INSTANCE.registerService(mbService);
        _pico.addComponent(com.ptb.sw.parsers.ModelBuilder.class, mbService, new Parameter[0]);
        _pico.addComponent(com.ptb.clerk.cache.ClerkCacheManager.class, ClerkCacheManagerImpl.getCacheManager(), new Parameter[0]);
        _pico.addComponent(com.ptb.clerk.psm.api.Index.class, com.ptb.clerk.psm.IndexImpl.class, new Parameter[0]);
        Index index = (Index)_pico.getComponent(com.ptb.clerk.psm.api.Index.class);
        index.setCaching(true);
        _pico.addComponent(com.ptb.clerk.psm.api.PsmManager.class, com.ptb.clerk.psm.PsmManagerImpl.class, new Parameter[0]);
        PsmManager psm = (PsmManager)_pico.getComponent(com.ptb.clerk.psm.api.PsmManager.class);
        Serializer serializer = new DefaultSerializer();
        serializer.setPretty(true);
        SerializerService sService = new SerializerService(serializer);
        ServiceManager.INSTANCE.registerService(sService);
        _pico.addComponent(com.ptb.sw.serial.Serializer.class, sService, new Parameter[0]);
        IDGeneratorService idGenService = new IDGeneratorService(new GUIDGenerator("http://resource.ptbsl.com#"));
        ServiceManager.INSTANCE.registerService(idGenService);
        _pico.addComponent(com.ptb.sw.util.IDGenerator.class, idGenService, new Parameter[0]);
        _pico.addComponent(com.ptb.clerk.deploy.desktop.DesktopLoader.class, new DesktopLoader(), new Parameter[0]);
        configureDeployManagement(webContext);
        _pico.addComponent(com.ptb.clerk.deploy.desktop.AuxFormLoader.class, new AuxFormLoader(index), new Parameter[0]);
        index.addListener((IndexListener)_pico.getComponent(com.ptb.clerk.deploy.desktop.AuxFormLoader.class));
        _pico.addComponent(com.ptb.rt.web.console.ProjectUtils.class);
        configurePersistence();
        if(Mode.TEST == IbapInfo.getIbapMode())
        {
            _pico.addComponent(com.ptb.clerk.conf.cache.CacheCleaner.class);
            CacheCleaner cacheCleaner = (CacheCleaner)_pico.getComponent(com.ptb.clerk.conf.cache.CacheCleaner.class);
            ((H2Server)_pico.getComponent(com.ptb.clerk.persistence.database.H2Server.class)).addListener(cacheCleaner);
        }
        index.addListener(webContext);
        ((Compiler)_pico.getComponent(com.ptb.clerk.scomp.Compiler.class)).addListener(webContext);
        if(Mode.TEST != IbapInfo.getIbapMode())
            psm.addListener(webContext);
        //index.addListener(((FilterChainProxy)_wapp.getAttribute("springSecurityFilterChain")).getSessionRegistry());
        index.addListener(new DefaultNullValueRepresentation(conf));
        index.addListener(new DefaultDecimalNumberFormat(conf));
        RDFXMLMapperService mapperService = new RDFXMLMapperServiceImpl(conf);
        ServiceManager.INSTANCE.registerService(mapperService);
        _pico.addComponent(com.ptb.clerk.rdfxml.RDFXMLMapperService.class, mapperService, new Parameter[0]);
        index.addListener(mapperService);
        _pico.addComponent(com.ptb.clerk.ws.WsFactory.class, new WsSoapFactory(conf), new Parameter[0]);
        _pico.addComponent(com.ptb.wsrt.core.metainfo.WsMetainfoManager.class, com.ptb.wsrt.core.metainfo.WsMetainfoManager.class, new Parameter[0]);
        _pico.addComponent(com.ptb.wsrt.core.error.WsErrorManager.class, new WsErrorManager((WsMetainfoManager)_pico.getComponent(com.ptb.wsrt.core.metainfo.WsMetainfoManager.class), (CorePersistenceManager)_pico.getComponent(com.ptb.clerk.persistence.api.core.CorePersistenceManager.class)), new Parameter[0]);
        _pico.addComponent(com.ptb.clerk.ws.server.WsProxyServer.class, new WsSoapServer(conf, _pico), new Parameter[0]);
        index.addListener((IndexListener)_pico.getComponent(com.ptb.wsrt.core.metainfo.WsMetainfoManager.class));
        index.addListener((IndexListener)_pico.getComponent(com.ptb.wsrt.core.error.WsErrorManager.class));
        index.addListener((IndexListener)_pico.getComponent(com.ptb.clerk.ws.WsFactory.class));
        index.addListener((IndexListener)_pico.getComponent(com.ptb.clerk.ws.server.WsProxyServer.class));
        _pico.addComponent(com.ptb.rt.web.SkinManager.class);
        _pico.getComponent(com.ptb.rt.web.SkinManager.class);
        _pico.addComponent(com.ptb.clerk.reports.api.ReportManager.class, com.ptb.clerk.reports.ReportManagerImpl.class, new Parameter[0]);
        _pico.addComponent(com.ptb.clerk.pfe.api.UserProfile.class, com.ptb.clerk.aa.SpringUserProfile.class, new Parameter[0]);
        _pico.addComponent(com.ptb.clerk.pfe.api.PageflowManager.class, com.ptb.clerk.pfe.impl.PageflowManagerImpl.class, new Parameter[0]);
        _pico.addComponent(com.ptb.clerk.pfe.api.I18NRegistry.class, com.ptb.clerk.pfe.impl.PersistentI18NRegistry.class, new Parameter[0]);
        _pico.addComponent(com.ptb.clerk.persistence.api.i18n.I18NPersistenceManager.class, com.ptb.clerk.persistence.i18n.I18NPersistenceManagerImpl.class, new Parameter[0]);
        index.addListener((IndexListener)_pico.getComponent(com.ptb.clerk.persistence.api.i18n.I18NPersistenceManager.class));
        PageflowManagerImpl pfm = (PageflowManagerImpl)_pico.getComponent(com.ptb.clerk.pfe.api.PageflowManager.class);
        _pico.addComponent(com.ptb.clerk.pfe.api.ScriptRunner.class, pfm.getScriptRunner(), new Parameter[0]);
        _pico.addComponent(org.apache.camel.impl.DefaultCamelContext.class, org.apache.camel.impl.DefaultCamelContext.class, new Parameter[0]);
        _pico.getComponent(org.apache.camel.impl.DefaultCamelContext.class);
        _pico.addComponent(com.ptb.clerk.jndi.LdapInspectorFactory.class, com.ptb.clerk.jndi.LdapInspectorFactoryImpl.class, new Parameter[0]);
        JMSHelperImpl jmsHelper = new JMSHelperImpl(conf);
        _pico.addComponent(com.ptb.clerk.jms.JMSHelper.class, jmsHelper, new Parameter[0]);
        index.addListener(jmsHelper);
        _pico.addComponent(com.ptb.clerk.bpm.BPMNEngineManager.class, com.ptb.clerk.bpm.BPMNEngineManagerImpl.class, new Parameter[0]);
        BPMNEngineManager bem = (BPMNEngineManager)_pico.getComponent(com.ptb.clerk.bpm.BPMNEngineManager.class);
        index.addListener(bem);
        _pico.addComponent(com.ptb.clerk.batch.BatchManager.class, com.ptb.clerk.batch.BatchManagerImpl.class, new Parameter[0]);
        if(Mode.TEST == IbapInfo.getIbapMode())
        {
            Compiler compiler = (Compiler)_pico.getComponent(com.ptb.clerk.scomp.Compiler.class);
            H2Server h2Server = (H2Server)_pico.getComponent(com.ptb.clerk.persistence.database.H2Server.class);
            compiler.addListener(bem);
            compiler.addListener(h2Server);
            webContext.addListener(bem);
            webContext.addListener(h2Server);
            psm.addListener(bem);
            psm.addListener(h2Server);
            psm.addListener(webContext);
        }
        _pico.addComponent(com.ptb.clerk.deploy.ProjectPropertiesDeployment.class);
        index.addListener((IndexListener)_pico.getComponent(com.ptb.clerk.deploy.ProjectPropertiesDeployment.class));
        _pico.addComponent(com.ptb.clerk.aa.api.LoginConfigurator.class, com.ptb.clerk.login.LoginConfiguratorImpl.class, new Parameter[0]);
        //_pico.getComponent(com.ptb.clerk.aa.api.LoginConfigurator.class);
        ServiceManager.INSTANCE.start();
        configureCamel();
        if(!IbapInfo.isLogFileDisallowed())
            index.addListener(new RollingLogFileHandler(webContext));
        if(IbapInfo.checkIbapConfig() == null && ((DataSourceProvider)_pico.getComponent(com.ptb.clerk.persistence.api.database.DataSourceProvider.class)).checkIbapDs() == null)
            try
            {
                ConfigurationSchemaManagement csm = (ConfigurationSchemaManagement)_pico.getComponent(com.ptb.clerk.conf.ConfigurationSchemaManagement.class);
                boolean checkNow = IbapInfo.getIbapMode() != Mode.TEST;
                if(checkNow)
                    csm.check();
                if(!checkNow || csm.isOk())
                {
                    webContext.load();
                    if(webContext.hasActiveProject())
                    {
                        index.load(webContext.getActiveProject().getDeployFolder());
                        if(!checkNow)
                            csm.check();
                    }
                }
            }
            catch(Exception ex)
            {
                LOG.error(ex.getMessage(), ex);
            }
    }

    private void configureDeployManagement(WebContext webContext)
        throws Exception
    {
        LOG.info("--> DeployManagement");
        R2bHelper helper = new R2bHelper();
        ProjectManager projectManager = new ProjectManagerImpl(null, new File((new StringBuilder()).append(IbapInfo.getIbapHome()).append(".internalModules").toString()), helper, IbapInfo.getMaxCachedDocuments());
        ProjectManagerFormatsRegister.registerSupportedFormats(projectManager, helper);
        ServiceManager.INSTANCE.registerService(projectManager);
        _pico.addComponent(com.ptb.project.api.ProjectManager.class, projectManager, new Parameter[0]);
        File repositoriesFile = new File(webContext.getFolder(), "repo");
        if(!repositoriesFile.exists())
            repositoriesFile.createNewFile();
        RepositoryManager repoManager = new RepositoryManagerImpl(repositoriesFile);
        ServiceManager.INSTANCE.registerService(repoManager);
        _pico.addComponent(com.ptb.project.api.RepositoryManager.class, repoManager, new Parameter[0]);
        VCManager vcManager = new VCManagerImpl(projectManager, repoManager);
        ServiceManager.INSTANCE.registerService(vcManager);
        _pico.addComponent(com.ptb.project.vc.api.VCManager.class, vcManager, new Parameter[0]);
        DownloadServiceListener downloadListener = new DownloadServiceListener();
        _pico.addComponent(com.ptb.rt.web.DownloadServiceListener.class, downloadListener, new Parameter[0]);
        GlobalModelFacade gmf = new GlobalModelFacade(projectManager, true);
        ServiceManager.INSTANCE.registerService(com.ptb.model2.support.facade.GlobalModelFacade.class, gmf, new Parameter[0]);
        _pico.addComponent(com.ptb.model2.support.facade.GlobalModelFacade.class, gmf, new Parameter[0]);
        Compiler compiler = new CompilerImpl();
        compiler.registerTransformer(new ConfigurationTransformer());
        compiler.registerTransformer(new ModelTransformer());
        compiler.registerTransformer(new XsdModelTransformer());
        compiler.registerTransformer(new ConstantGenerator());
        compiler.registerTransformer(new CsqlTransformer());
        compiler.registerTransformer(new GlobalVarDocTransformer());
        compiler.registerTransformer(new PfuiTransformer());
        compiler.registerTransformer(new DesktopGenerator());
        compiler.registerTransformer(new ConfigurableRdfXmlTransformer());
        compiler.registerTransformer(new WsTransformer());
        compiler.registerTransformer(new DeclaredHostTransformer());
        compiler.registerTransformer(new InitializationScriptGenerator());
        compiler.registerTransformer(new BPMNTransformer());
        compiler.registerTransformer(new I18NTransformer());
        compiler.registerTransformer(new DOCXTransformer());
        compiler.registerTransformer(new EdTransformer());
        compiler.registerTransformer(new ProjectMetadataGenerator(projectManager));
        com.ptb.clerk.scomp.CompListener compListener = new BCompListener(projectManager);
        compiler.addListener(compListener);
        _pico.addComponent(com.ptb.clerk.scomp.BCompListener.class, compListener, new Parameter[0]);
        _pico.addComponent(com.ptb.clerk.scomp.Compiler.class, compiler, new Parameter[0]);
        LOG.info("<-- DeployManagement");
    }

    private void configureDataSource()
        throws Exception
    {
        LOG.info("--> configureDataSource");
        if(Mode.TEST == IbapInfo.getIbapMode())
            _pico.addComponent(com.ptb.clerk.persistence.database.H2Server.class, com.ptb.clerk.persistence.database.H2Server.class, new Parameter[0]);
        _pico.addComponent(com.ptb.clerk.persistence.api.database.DataSourceProvider.class, com.ptb.clerk.persistence.database.datasource.ConfigurationDataSourceProvider.class, new Parameter[0]);
    }

    private void configurePersistence()
        throws Exception
    {
        LOG.info("--> configurePersistence");
        Index index = (Index)_pico.getComponent(com.ptb.clerk.psm.api.Index.class);
        if(Mode.TEST == IbapInfo.getIbapMode())
        {
            H2Server h2 = (H2Server)_pico.getComponent(com.ptb.clerk.persistence.database.H2Server.class);
            index.addListener(h2);
        }
        _pico.addComponent(com.ptb.clerk.persistence.api.core.CorePersistenceManager.class, com.ptb.clerk.persistence.core.CorePersistenceManagerImpl.class, new Parameter[0]);
        _pico.addComponent(com.ptb.clerk.persistence.api.model.ModelPersistenceManager.class, com.ptb.clerk.persistence.online.OnlinePersistenceManagerImpl.class, new Parameter[0]);
        _pico.getComponent(com.ptb.clerk.persistence.api.core.CorePersistenceManager.class);
        LOG.info("<-- configurePersistence");
    }

    private void configureCamel()
        throws Exception
    {
        LOG.info("--> configureCamel");
        DefaultCamelContext camelContext = (DefaultCamelContext)_pico.getComponent(org.apache.camel.impl.DefaultCamelContext.class);
        camelContext.addComponent("direct", new DirectComponent());
        camelContext.start();
        LOG.info("<-- configureCamel");
    }

    public static final String SPRING_SECURITY_FILTER_CHAIN = "springSecurityFilterChain";
    private static Logger LOG = LoggerFactory.getLogger(com.ptb.rt.web.ContextInit.class);
    private MutablePicoContainer _pico;
    private WebApp _wapp;

}